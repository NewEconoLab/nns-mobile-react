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

@inject('manager')
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
			this.setState({ timelater: 1 })
			return <span className="text-red">（已过期）</span>;
		}

		if (formatTime.formatUnixTime(time) - new Date().getTime() <= (86400000 * 60)) {
			return <span className="text-orange">（即将过期）</span>;
		}

		return <span />;
	}
	public changeReaolverAddress = (value:string)=>{
		// this.state.detail.resolverAddr = value;	
		this.setState({
			resolverAddr:value
		})	
		console.log(this.state.resolverAddr);
		
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
	public onReNew = () => {
		alert('todo')
		// todo
	}
	public onCloseMessageResolver = () => {
		this.setState({
			showResolver: false
		})
	}
	public onConfirmMessageResolver = async () => {
		const res = await nnstools.setResolve(this.state.detail.domain,this.state.detail.resolver);
		if(res && res["txid"])
		{
			const txid = res[ "txid" ];
			taskmanager.addTask(
				new Task(ConfirmType.contract, txid, { domain: this.state.detail.domain, contract: this.state.detail.resolver }),
				TaskType.domainResovle
			);
			
			Alert(this.prop.message.successmsg, this.prop.message.waitmsg, this.prop.btn.confirm, ()=>{ 
				console.log("成功了");                        
			});
			this.onCloseMessageResolver();
		}
	}
	public onCloseMessageResolverAddr = () => {
		this.setState({
			showResolverAddr: false
		})
	}
	public onConfirmMessageResolverAddr = async () => {
		const res = await nnstools.setResolveData(this.state.detail.domain,this.state.resolverAddr,this.state.detail.resolver);
		if(res && res["txid"])
		{
			const txid = res[ "txid" ];
			taskmanager.addTask(
				new Task(ConfirmType.contract, txid, { domain: this.state.detail.domain, address: this.state.detail.resolverAddr }),
				TaskType.domainMapping
			);
			
			Alert(this.prop.message.successmsg, this.prop.message.waitmsg, this.prop.btn.confirm, ()=>{ 
				console.log("成功了");                        
			});
			this.onCloseMessageResolver();
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
			"6bcc17c5628de5fc05a80cd87add35f0f3f1b0ab";
		this.state.detail.resolverAddr = 
			this.props.manager.detail.resolverAddr
		return (
			<div className="domainset-wrap">
				<div className="mapping-block">
					<TitleText text="域名" />
					<div className="text-normal">{this.props.manager.detail.domain}</div>
				</div>
				<div className="mapping-block">
					<TitleText text="地址解析器">
						{
							this.props.manager.detail.resolver ?
								<Button type="warning" inline={true} size="small" onClick={this.onChangeResolver}>重置</Button> :
								<Button type="primary" inline={true} size="small" onClick={this.onChangeResolver}>设置</Button>
						}
					</TitleText>
					<div className="text-normal">{this.props.manager.detail.resolver || '未设置'}</div>
				</div>
				<div className="mapping-block">
					<TitleText text="地址映射">
						{
							this.props.manager.detail.resolverAddr ?
								<Button type="warning" inline={true} size="small" onClick={this.onChangeResolverAddr}>重置</Button> :
								<Button type="ghost" inline={true} size="small" disabled={!this.state.detail.resolver} style={{ background: '#ddd', color: '#bbb' }} onClick={this.onChangeResolverAddr}>设置</Button>
						}
					</TitleText>
					<div className="text-normal">{this.props.manager.detail.resolverAddr || '未设置'}</div>
				</div>
				<div className="mapping-block">
					<TitleText text="到期时间">
						{
							this.state.timelater === 1 && <Button type="primary" inline={true} size="small" onClick={this.onReNew}>续约</Button>
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
								{this.state.detail.resolver}
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
