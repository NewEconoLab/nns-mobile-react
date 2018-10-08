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

@inject('manager')
@observer
class DomainMap extends React.Component<IProps, IState>
{
	public state = {
		timelater: 0, // 1 即将过期
		showResolver: false, // 显示Resolver 的 弹框
		showResolverAddr: false, // 显示ResolverAddr 的 弹框
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
	public onConfirmMessageResolver = () => {
		alert('todo');
		this.onCloseMessageResolver();
	}
	public onCloseMessageResolverAddr = () => {
		this.setState({
			showResolverAddr: false
		})
	}
	public onConfirmMessageResolverAddr = () => {
		alert('todo');
		this.onCloseMessageResolver();
	}

	public render() {
		if (!this.props.manager.detail) {
			return null;
		}
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
								<Button type="ghost" inline={true} size="small" disabled={!this.props.manager.detail.resolver} style={{ background: '#ddd', color: '#bbb' }} onClick={this.onChangeResolverAddr}>设置</Button>
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
								6bcc17c5628de5fc05a80cd87add35f0f3f1b0ab
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
								<Input type="text" placeholder="" value="1" onChange={Function} />
							</div>
						</Message>
					)
				}
			</div>
		);
	}
}

export default injectIntl(DomainMap)
