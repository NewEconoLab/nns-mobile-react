/**
 * 我的竞拍列表
 */
import * as React from 'react';
import { injectIntl } from 'react-intl';
import TitleText from '@/components/titletext';
import Hint from '@/components/hint';
import './index.less'
import { Button } from 'antd-mobile';
import { IAuctionListProps } from './interface/index.interface';
import * as formatTime from 'utils/formatTime';
import { AuctionState } from '@/store/interface/auction.interface';

class MyAuctionList extends React.Component<IAuctionListProps>
{
	public prop = this.props.intl.messages;
	// 跳转到竞拍详情页
	public onGotoDetail = () => {
		this.props.myauction.detail = this.props.item;
		this.props.history.push('/auction/detail')
	}

	public bidder = () => {
		const address = this.props.item.maxBuyer.replace(/^(\w{4})(.*)(\w{4})$/, '$1...$3');
		if (this.props.item.maxBuyer === this.props.common.address) {
			return <span className="auction-me">{this.prop.myauction.me}（ {address} ）</span>
		}
		return <span>{this.prop.myauction.other}（ {address} ）</span>
	}
	public btnStatus = () => {
		if (this.props.item.maxBuyer === this.props.common.address) 
		{
			if(this.props.item.addWho.getdomainTime)
			{
				return <Button type="primary" disabled={true} inline={true} size="small">{this.prop.btn.claimed}</Button>
			}else
			{
				return <Button type='primary' inline={true} size='small' >{this.prop.btn.claimdomain}</Button>
			}
		}
		else
		{
			if(this.props.item.addWho.accountTime)
			{
				return <Button type="primary" disabled={true} inline={true} size="small">{this.prop.btn.reclaimed}</Button>
			}else{				
				return <Button type="primary" inline={true} size="small">{this.prop.btn.reclaimcgas}</Button>
			}
		}
	}
	public render() {
		const item = this.props.item;
		return (
			<div className="myauction-wrap box-wrap">
				<TitleText text={this.prop.myauction.title}>
					<div className="status-group">
						{
							item.auctionState === AuctionState.end &&
							<div>
								<span>{this.prop.myauction.stage}：</span>
								<span className="status-end">{this.prop.myauction.ended}</span>
							</div>
						}
						{
							item.auctionState === AuctionState.random &&
							<div>
								<span>{this.prop.myauction.stage}：</span>
								<span className="status-random">{this.prop.myauction.overtime}</span>
								<Hint type='2'/>
							</div>
						}
						{
							item.auctionState === AuctionState.fixed &&
							<div>
								<span>{this.prop.myauction.stage}：</span>
								<span className="status-being">{this.prop.myauction.period}</span>
								<Hint type='1'/>
							</div>
						}
					</div>
				</TitleText>
				<div onClick={this.onGotoDetail}>
					<div className="myauction-list">
						<div className="list-left">
							<div className="auction-name">{item.domain}</div>
							<div className="auction-normal">
								<span>{this.prop.myauction.highbid}</span>
								<span>{item.maxPrice} CGAS</span>
							</div>
							<div className="auction-normal">
								<span>{this.prop.myauction.bidder}</span>
								<span>{this.bidder()}</span>
							</div>
							<div className="auction-normal">
								<span>{this.prop.myauction.starttime}</span>
								<span>{formatTime.format('yyyy/MM/dd hh:mm:ss', this.props.item.startTime.blocktime.toString(), this.props.intl.locale)}</span>
							</div>
						</div>
						<div className="list-right">
							{
								item.auctionState === AuctionState.end && this.btnStatus()
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default injectIntl(MyAuctionList);
