
/**
 * nns主页提取功能
 */
import * as React from 'react';
import { Button, WingBlank } from 'antd-mobile';
import { observer, inject } from 'mobx-react'
import account from '@/img/auctionaccount.png'
import balance from '@/img/balance.png'
import direction from '@/img/direction1.png'
import Input from '@/components/Input/Input'
import './index.less'
import TitleText from '@/components/titletext';
import { IWithDrawProps } from './interface/withdraw.interface';
import { injectIntl } from 'react-intl';
import { nnstools } from '@/utils/nnstools';
import DomainSelling from '@/store/DomainSelling';
import taskmanager from '@/store/taskmanager';
import { Task, TaskType, ConfirmType } from '@/store/interface/taskmanager.interface';

@inject('withdraw', 'common')
@observer
class Withdraw extends React.Component<IWithDrawProps>
{
	public prop = this.props.intl.messages;
	public componentDidMount() {
		this.props.withdraw.messages = {
			msg:this.prop.topup.msg,
			errmsg:this.prop.topup.errmsg,
		}
	  }
	public change = (value: string) => {

		if(/\./.test(value) && value.split('.')[1].length > 8) {
			return false;
		}
		this.props.withdraw.inputModule = {
			inputValue:value,
		}

		return true;
	}
	public onGetAll = () => {
		this.props.withdraw.inputModule = {
			inputValue:this.props.common.accountBalance
		}
	}
	public onWithDraw = async () => {
		// todo
		const amount = parseFloat(this.props.withdraw.inputModule.inputValue);
		const res = await nnstools.getMoneyBack(amount,DomainSelling.RootNeo.register);
		if(res.txid)
		{
			taskmanager.addTask(new Task(TaskType.withdraw,ConfirmType.tranfer,res.txid,{amount}));
			console.log(res.txid);			
		}
		// await this.props.common.sendrawtransaction();
    alert('操作成功');
	}
	public componentWillUnmount() {
    this.props.withdraw.inputModule.inputValue = '';
    this.props.withdraw.inputModule.status = '';
    this.props.withdraw.inputModule.message = '';
    this.props.withdraw.inputModule.color = '';
  }
	// 发送交易接口sendrawtransaction 传参：已附加签名鉴证的txHex
	public render() {
		const disabled = this.props.withdraw.inputModule.color !== '' || !this.props.withdraw.inputModule.inputValue || parseFloat(this.props.withdraw.inputModule.inputValue) === 0;
		return (
			<div className="topup-wrap">
				<TitleText text={this.prop.topup.title3} />
				<div className="change-wrapper">
					<div className="change-left">
						<img src={account} alt="" className="wallet-img" />
						<h2 className="h2-text">{this.prop.topup.account}</h2>
						<span className="change-number">{this.prop.topup.balance} {this.props.common.accountBalance}</span>
					</div>
					<div className="change-middle">
						<img src={direction} alt="" className="direction-img" />
					</div>
					<div className="change-right">
						<img src={balance} alt="" className="wallet-img" />
						<h2 className="h2-text">{this.prop.topup.wallet}</h2>
						<span className="change-number">{this.prop.topup.balance} {this.props.common.cgasBalance}</span>

					</div>
				</div>
				<TitleText text={this.prop.topup.title4} />
				<div className="amount-number">
					<Input
						placeholder=""
						style={{ width: 345 }}
						status={this.props.withdraw.inputModule.status}
						message={this.props.withdraw.inputModule.message}
						value={this.props.withdraw.inputModule.inputValue}
						onChange={this.change}
						type="number"
						color={this.props.withdraw.inputModule.color}
					/>
					<span className="input-right" onClick={this.onGetAll}>{this.prop.topup.max}</span>
				</div>
				<div className="topup-footer">
					<WingBlank>
						<Button 
							type="primary"
							disabled={disabled}
							onClick={this.onWithDraw}
						>{this.prop.btn.withdraw}</Button>
					</WingBlank>
				</div>
			</div>
		);
	}
}
export default injectIntl(Withdraw);