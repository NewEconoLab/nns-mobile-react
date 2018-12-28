/**
 * 域名的解析、映射以及续约
 */
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import TitleText from '@/components/titletext';
import { Button } from 'antd-mobile';
import { IState, IProps } from './interface/detail.interface';
import * as formatTime from 'utils/formatTime';
import Message from '@/components/message';
import Input from '@/components/Input/Input';
import './index.less'
import { nnstools } from '@/utils/nnstools';
import taskmanager from '@/store/taskmanager';
import { Task, ConfirmType, TaskType } from '@/store/interface/taskmanager.interface';
import Alert from '@/components/alert';
import DomainSelling from '@/store/DomainSelling';
import { HASH_CONFIG } from '@/config';
import { IManagerList } from './interface/index.interface';

@inject('manager','statemanager')
@observer
class DomainMap extends React.Component<IProps, IState>
{
    public prop = this.props.intl.messages;
	public state = {
		timelater: 0, // 1 即将过期
		showResolver: false, // 显示Resolver 的 弹框
		showResolverAddr: false, // 显示ResolverAddr 的 弹框
		detail:{
			domain:"",
			resolver:"",
			resolverAddr:""
		},
		resolverAddr:""
	}
	public componentDidMount() {
		if (!this.props.manager.detail) {
			this.props.history.goBack();
		}
	}
	public dateComputed = (time: string) => {

		if (new Date().getTime() > formatTime.formatUnixTime(time)) {
			return <span className="text-red">{this.prop.manager.msg2}</span>;
		}
		if (formatTime.formatUnixTime(time) - new Date().getTime() <= (DomainSelling.day * 60)) {
			return <span className="text-orange">{this.prop.manager.msg}</span>;
		}

		return <span />;
	}

	public renewdiv = (time: string) =>
	{
		if (new Date().getTime() > formatTime.formatUnixTime(time)) {
			return null;
		}else if (formatTime.formatUnixTime(time) - new Date().getTime() <= (DomainSelling.day * 60)) {
			return (	
				this.props.statemanager.renewDomainState.includes(this.state.detail.domain)?
				<Button type="primary" inline={true} size="small" loading={true}>{}</Button>:
				<Button type="primary" inline={true} size="small" onClick={this.onReNew}>{this.prop.btn.renew}</Button>
			)
		}else{
			return null;
		}
		
	}
	public changeReaolverAddress = (value:string)=>{
		this.setState({
			resolverAddr:value
		})	
	}
	public onChangeResolver = () => {
		this.setState({
			showResolver: true
		})
	}
	public onChangeResolverAddr = () => {
		this.setState({
			showResolverAddr: true
		})
	}
	public onReNew = async () => {
		this.props.statemanager.renewDomainState.push(this.state.detail.domain);
		const res = await nnstools.renewDomain(this.state.detail.domain,DomainSelling.RootNeo.register);
		if(res && res["txid"]!=='')
		{
			const txid = res[ "txid" ];
			const time = formatTime.formatUnixTime((this.props.manager.detail as IManagerList).ttl)+365*DomainSelling.day;
			taskmanager.addTask(
				new Task(TaskType.domainRenewal,ConfirmType.contract, txid, { domain: this.state.detail.domain,time})
			);
			
			Alert(this.prop.message.successmsg, this.prop.message.waitmsg, this.prop.btn.confirm, ()=>{ 
				console.log("成功了");                        
			});
			this.onCloseMessageResolver();
		}
		else
		{
			Alert(this.prop.message.errmsg, this.prop.message.errmsgtip1, this.prop.btn.confirm, () => {
				return;
			},'error');
			this.props.statemanager.renewDomainStateDel(this.state.detail.domain);
		}
	}
	public onCloseMessageResolver = () => {
		this.setState({
			showResolver: false
		})
	}
	public onConfirmMessageResolver = async () => {
		this.props.statemanager.setResolverState.push(this.state.detail.domain);
		const res = await nnstools.setResolve(this.state.detail.domain,HASH_CONFIG.resolverHash);
		if(res && res["txid"]!=='')
		{
			const txid = res[ "txid" ];
			taskmanager.addTask(
				new Task(TaskType.domainResovle,ConfirmType.contract, txid, { domain: this.state.detail.domain, contract: this.state.detail.resolver })
			);
			
			Alert(this.prop.message.successmsg, this.prop.message.waitmsg, this.prop.btn.confirm, ()=>{ 
				console.log("成功了");                        
			});
			this.onCloseMessageResolver();
		}
		else
		{
			Alert(this.prop.message.errmsg, this.prop.message.errmsgtip1, this.prop.btn.confirm, () => {
				return;
			},'error');
			this.props.statemanager.setResolverStateDel(this.state.detail.domain);
		}
	}
	public onCloseMessageResolverAddr = () => {
		this.setState({
			showResolverAddr: false
		})
	}
	public onConfirmMessageResolverAddr = async () => {
		this.props.statemanager.setResolverDataState.push(this.state.detail.domain);
		const res = await nnstools.setResolveData(this.state.detail.domain,this.state.resolverAddr,this.state.detail.resolver);
		console.log(res);
		
		if(res && res["txid"]!=='')
		{
			const txid = res[ "txid" ];
			// alert(this.state.resolverAddr)
			taskmanager.addTask(
				new Task(TaskType.domainMapping,ConfirmType.contract, txid, { domain: this.state.detail.domain, address: this.state.resolverAddr })
			);
			
			Alert(this.prop.message.successmsg, this.prop.message.waitmsg, this.prop.btn.confirm, ()=>{ 
				console.log("成功了");                        
			});
			this.onCloseMessageResolver();
		}
		else
		{
			Alert(this.prop.message.errmsg, this.prop.message.errmsgtip1, this.prop.btn.confirm, () => {
				return;
			},'error');
			this.props.statemanager.setResolverDataStateDel(this.state.detail.domain);
		}
	}

	public render() {
		if (!this.props.manager.detail) {
			return null;
		}
		
		this.state.detail.domain = this.props.manager.detail.domain;
		this.state.detail.resolver = 
			this.props.manager.detail.resolver?
			this.props.manager.detail.resolver:
			HASH_CONFIG.resolverHash;
		this.state.detail.resolverAddr = 
			this.props.manager.detail.resolverAddr
		return (
			<div className="domainset-wrap">
				<div className="mapping-block">
					<TitleText text={this.prop.manager.title2} />
					<div className="text-normal">{this.props.manager.detail.domain}</div>
				</div>
				<div className="mapping-block">
					<TitleText text={this.prop.manager.resolver}>
						{
							this.props.statemanager.setResolverState.includes(this.props.manager.detail.domain)?
							<Button type={this.props.manager.detail.resolver?"warning":"primary"} inline={true} size="small" loading={true}>{}</Button>:
							(
								this.props.manager.detail.resolver ?
								<Button type="warning" inline={true} size="small" onClick={this.onChangeResolver}>{this.prop.btn.reset}</Button> :
								<Button type="primary" inline={true} size="small" onClick={this.onChangeResolver}>{this.prop.btn.set}</Button>
							)
						}
					</TitleText>
					<div className={this.props.manager.detail.resolver?'text-normal':'text-normal nodata'}>{this.props.manager.detail.resolver || this.prop.manager.noset}</div>
				</div>
				<div className="mapping-block">
					<TitleText text={this.prop.manager.mapping}>
						{
							this.props.statemanager.setResolverDataState.includes(this.props.manager.detail.domain)?
							<Button type={this.props.manager.detail.resolverAddr?"warning":"primary"} inline={true} size="small" loading={true}>{}</Button>:
							(
								this.props.manager.detail.resolverAddr ?
								<Button type="warning" inline={true} size="small" onClick={this.onChangeResolverAddr}>{this.prop.btn.reset}</Button> :
								<Button type={!!!this.props.manager.detail.resolver?"ghost":"primary"} inline={true} size="small" disabled={!!!this.props.manager.detail.resolver}  onClick={this.onChangeResolverAddr}>{this.prop.btn.set}</Button>
							)
						}
					</TitleText>
					<div className={this.props.manager.detail.resolverAddr?'text-normal':'text-normal nodata'}>{this.props.manager.detail.resolverAddr || this.prop.manager.noset}</div>
				</div>
				<div className="mapping-block">
					<TitleText text={this.prop.manager.expirationtime}>
						{
							this.renewdiv(this.props.manager.detail.ttl)
						}
					</TitleText>
					<div className="text-normal">{formatTime.format('yyyy/MM/dd hh:mm:ss', this.props.manager.detail.ttl, this.props.intl.locale)} {this.dateComputed(this.props.manager.detail.ttl)}</div>
				</div>

				{
					// 地址解析
					this.state.showResolver && (
						<Message
							title={this.props.intl.messages.manager.resolver}
							onClose={this.onCloseMessageResolver}
							onConfirm={this.onConfirmMessageResolver}
						>
							<div className="message-resolver-box">
								{HASH_CONFIG.resolverHash}
							</div>
						</Message>
					)
				}
				{
					// 地址映射
					this.state.showResolverAddr && (
						<Message
							title={this.props.intl.messages.manager.mapping}
							onClose={this.onCloseMessageResolverAddr}
							onConfirm={this.onConfirmMessageResolverAddr}
						>
							<div className="message-resolveraddr-box">
								<Input type="text" placeholder="" value={this.state.resolverAddr} onChange={this.changeReaolverAddress} />
							</div>
						</Message>
					)
				}
			</div>
		);
	}
}

export default injectIntl(DomainMap)
