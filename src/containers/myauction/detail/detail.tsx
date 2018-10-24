/**
 * 域名详情子模块
 */
import * as React from 'react';
import TitleText from '@/components/titletext';
import Hint from '@/components/hint';
import { IAuctionDetailProps } from '../interface/index.interface';
import * as formatTime from 'utils/formatTime';
import { AuctionState, IAuctionAddress } from '@/store/interface/auction.interface';
import '../index.less'
import common from '@/store/common';
export default class Detail extends React.Component<IAuctionDetailProps>
{
	public bidder = () => {
		if (!this.props.myauction.detail) {
			return null;
		}
		const address = this.props.myauction.detail.maxBuyer.replace(/^(\w{4})(.*)(\w{4})$/, '$1...$3');
		if (this.props.myauction.detail.maxBuyer === this.props.common.address) {
			return <span className="auction-me">我（ {address} ）</span>
		}
		return <span>他人（ {address} ）</span>
	}
	public render() {
		const detail = this.props.myauction.detail;
		if (!detail) {
			return null;
		}
		if(!detail.addWho)
		{
			detail.addWho={} as IAuctionAddress;
			detail.addWho["address"]=common.address;
			detail.addWho["totalValue"]=0;
		}else{
			detail.addWho.totalValue=detail.addWho.totalValue?detail.addWho.totalValue:0;
		}
		return (
			<React.Fragment>
				<div className="domain-detail">
					<TitleText text="域名信息">
						<div className="status-group">
							{
								detail.auctionState === AuctionState.end &&
								<div>
									<span>状态：</span>
									<span className="status-end">已结束</span>
								</div>
							}
							{
								detail.auctionState === AuctionState.random &&
								<div>
									<span>状态：</span>
									<span className="status-random">随机期</span>
									<Hint />
								</div>
							}
							{
								detail.auctionState === AuctionState.fixed &&
								<div>
									<span>状态：</span>
									<span className="status-being">确定期</span>
									<Hint />
								</div>
							}
						</div>
					</TitleText>
					<div className="detail-content">
						<div className="auction-name">{detail.domain}</div>
						<div className="auction-normal">当前最高价：{detail.maxPrice} CGAS</div>
						<div className="auction-normal">出价者：{this.bidder()}</div>
						<div className="auction-normal">开标时间：{formatTime.format('yyyy/MM/dd hh:mm:ss', detail.startTime.blocktime.toString(), this.props.intl.locale)}</div>
						<div className="auction-normal">我的出价总和：<span className="text-red">{detail.addWho.totalValue}</span> CGAS</div>   {/*todo  出价总和怎么求*/ /*这一看就是你男票帮你写的吧*/ }
					</div>
				</div>
			</React.Fragment>
		);
	}
}
