
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
import taskmanager from '@/store/taskmanager';
import { Task, TaskType, ConfirmType } from '@/store/interface/taskmanager.interface';

// 发送交易接口sendrawtransaction 传参：已附加签名鉴证的txHex
@inject('topup', 'common')
@observer
export default class Topup extends React.Component<ITopupProps>
{
	public change = (value: string) => {
		if (/\./.test(value) && value.split('.')[1].length > 8) {
			return false;
		}
		this.props.topup.inputModule.inputValue = value;

		return true;
	}
	public onGetAll = () => {
		this.props.topup.inputModule = {
			inputValue: this.props.common.accountBalance
		}
	}
	/**
	 * onTopup
	 */
	public onTopup = async () => {
		const amount = this.props.topup.inputModule.inputValue
		const res = await nnstools.rechargeReg(amount);
		if(res.txid)
		{
			taskmanager.addTask(new Task(TaskType.topup,ConfirmType.tranfer,res.txid,{amount}));
			console.log(res.txid);
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
				<TitleText text="充值CGAS" />
				<div className="change-wrapper">
					<div className="change-left">
						<img src={balance} alt="" className="wallet-img" />
						<h2 className="h2-text">钱包</h2>
						<span className="change-number">余额： {this.props.common.cgasBalance}</span>
					</div>
					<div className="change-middle">
						<img src={direction} alt="" className="direction-img" />
					</div>
					<div className="change-right">
						<img src={account} alt="" className="wallet-img" />
						<h2 className="h2-text">竞拍账户</h2>
						<span className="change-number">余额： {this.props.common.accountBalance}</span>
					</div>
				</div>
				<TitleText text="充值数量" />
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
					<span className="input-right">全部</span>
				</div>
				<div className="topup-footer">
					<WingBlank>
						<Button
							type="primary"
							disabled={disabled}
							onClick={this.onTopup}
						>充值</Button>
					</WingBlank>
				</div>
			</div>
		);
	}
}