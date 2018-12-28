
/**
 * nns主页下充值功能
 */
import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { Button, WingBlank } from 'antd-mobile';
import account from '@/img/auctionaccount.png'
import balance from '@/img/balance.png'
import direction from '@/img/direction1.png'
import Input from '@/components/Input/Input'
import { ITopupProps } from './interface/topup.interface';
import './index.less'
import TitleText from '@/components/titletext';
import { nnstools } from '@/utils/nnstools';
import Alert from '@/components/alert';
import { injectIntl } from 'react-intl';
import taskmanager from '@/store/taskmanager';
import { Task, TaskType, ConfirmType } from '@/store/interface/taskmanager.interface';

// 发送交易接口sendrawtransaction 传参：已附加签名鉴证的txHex
@inject('topup', 'common')
@observer
class Topup extends React.Component<ITopupProps>
{
	public prop = this.props.intl.messages;
	public componentDidMount() {
		this.props.topup.messages = {
			msg:this.prop.topup.msg,
			errmsg:this.prop.topup.errmsg,
		}
	  }
	public change = (value: string) => {
		if (/\./.test(value) && value.split('.')[1].length > 8) {
			return false;
		}
		this.props.topup.inputModule.inputValue = value;

		return true;
	}
	public onGetAll = () => {
		this.props.topup.inputModule = {
			inputValue: this.props.common.cgasBalance
		}
	}
	/**
	 * onTopup
	 */
	public onTopup = async () => {
		const amount = this.props.topup.inputModule.inputValue
		const res = await nnstools.rechargeReg(amount);
		if(res.txid!=='')
		{
			taskmanager.addTask(new Task(TaskType.topup,ConfirmType.tranfer,res.txid,{amount}));
			Alert(this.prop.message.successmsg, this.prop.message.waitmsg, this.prop.btn.confirm, function () {
				return;
			  });
		}
		else
		{			
			Alert(this.prop.message.errmsg, this.prop.message.errmsgtip1, this.prop.btn.confirm, () => {
				return;
			},'error');
		}
	}
	public componentWillUnmount() {
    this.props.topup.inputModule.inputValue = '';
    this.props.topup.inputModule.status = '';
    this.props.topup.inputModule.message = '';
    this.props.topup.inputModule.color = '';
	}
	
	public render() {
		const disabled = this.props.topup.inputModule.color !== '' || !this.props.topup.inputModule.inputValue || parseFloat(this.props.topup.inputModule.inputValue) === 0;
		return (
			<div className="topup-wrap">
				<TitleText text={this.prop.topup.title} />
				<div className="change-wrapper">
					<div className="change-left">
						<img src={balance} alt="" className="wallet-img" />
						<h2 className="h2-text">{this.prop.topup.wallet}</h2>
						<span className="change-number">{this.prop.topup.balance} {this.props.common.cgasBalance}</span>
					</div>
					<div className="change-middle">
						<img src={direction} alt="" className="direction-img" />
					</div>
					<div className="change-right">
						<img src={account} alt="" className="wallet-img" />
						<h2 className="h2-text">{this.prop.topup.account}</h2>
						<span className="change-number">{this.prop.topup.balance} {this.props.common.accountBalance}</span>
					</div>
				</div>
				<TitleText text={this.prop.topup.title2} />
				<div className="amount-number">
					<Input
						placeholder=""
						style={{ width: 345 }}
						status={this.props.topup.inputModule.status}
						message={this.props.topup.inputModule.message}
						value={this.props.topup.inputModule.inputValue}
						onChange={this.change}
						type="number"
						color={this.props.topup.inputModule.color}
					/>
					<span className="input-right" onClick={this.onGetAll}>{this.prop.topup.max}</span>
				</div>
				<div className="topup-footer">
					<WingBlank>
						<Button
							type="primary"
							disabled={disabled}
							onClick={this.onTopup}
						>{this.prop.btn.topup}</Button>
					</WingBlank>
				</div>
			</div>
		);
	}
}
export default injectIntl(Topup);