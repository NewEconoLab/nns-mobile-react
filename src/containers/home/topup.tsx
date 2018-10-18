
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
import classnames from 'classnames';
import { ITopupProps } from './interface/topup.interface';
import './index.less'
import TitleText from '@/components/titletext';
import { nnstools } from '@/utils/nnstools';
import DomainSelling from '@/store/DomainSelling';

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
	public onTopup = () => {
		DomainSelling.initRoot()
		.then(
			data=>{
				// const amount = Neo.Fixed8.parse(this.props.topup.inputModule.inputValue).toString()
				nnstools.rechargeReg(this.props.topup.inputModule.inputValue)
			}
		)
	}
	public onWithDraw = async () => {
		// todo
		await this.props.common.sendrawtransaction('8000000149f2db1d71febefe9d12e6e840e988a28ab516134b38e948f8051ea0cc0f22cb010002e72d286979ee6cb1b7e65dfddfb2e384100b8d148e7758de42e4168b71792c6040420f00000000008c8ed58be92fd1b01896dd9e02acd45776eb3e8ce72d286979ee6cb1b7e65dfddfb2e384100b8d148e7758de42e4168b71792c60203e57d4e8000000b7b0b2d92b970affd9567faf10205ca222e389330141406ca464fdaab4a63d4bf2737c2035944fcef8511caaa59aa0bdf73107dd93825b66344b107cf6b9c13aa9baa6749217541d94d56e54f2cc9a6bc54e0da36c6c6e2321029020fd0914c677a1ab7d8b3502ca9a4506efbf7572ea24fb3862f48dd153ee5bac');
		alert('操作成功');
	}
	public render() {
		const disabled = this.props.topup.inputModule.color !== '' || !this.props.topup.inputModule.inputValue || parseFloat(this.props.topup.inputModule.inputValue) === 0
		const disabledClassName = classnames({ 'disabled': disabled });
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
							className={disabledClassName}
							disabled={disabled}
							onClick={this.onTopup}
						>充值</Button>
					</WingBlank>
				</div>
			</div>
		);
	}
}