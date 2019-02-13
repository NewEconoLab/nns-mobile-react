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
import { injectIntl } from 'react-intl';
class Detail extends React.Component<IAuctionDetailProps>
{
	public prop = this.props.intl.messages;
	public bidder = () => {
		if (!this.props.myauction.detail) {
			return null;
		}
		const address = this.props.myauction.detail.maxBuyer.replace(/^(\w{4})(.*)(\w{4})$/, '$1...$3');
		if (this.props.myauction.detail.maxBuyer === this.props.common.address) {
			return <span className="auction-me">{this.prop.myauction.me}（ {address} ）</span>
		}
		return <span>{this.prop.myauction.other}（ {address} ）</span>
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
					<TitleText text={this.prop.myauction.info.title}>
						<div className="status-group">
							{
								detail.auctionState === AuctionState.end &&
								<div>
									<span>{this.prop.myauction.stage}：</span>
									<span className="status-end">{this.prop.myauction.ended}</span>
								</div>
							}
							{
								detail.auctionState === AuctionState.random &&
								<div>
									<span>{this.prop.myauction.stage}：</span>
									<span className="status-random">{this.prop.myauction.overtime}</span>
									<Hint type='2' />
								</div>
							}
							{
								detail.auctionState === AuctionState.fixed &&
								<div>
									<span>{this.prop.myauction.stage}：</span>
									<span className="status-being">{this.prop.myauction.period}</span>
									<Hint type='1'/>
								</div>
							}
						</div>
					</TitleText>
					<div className="detail-content">
						<div className="auction-name">{detail.domain}</div>
						<div className="auction-normal">{this.prop.myauction.highbid}{detail.maxPrice} CGAS</div>
						<div className="auction-normal">{this.prop.myauction.bidder}{this.bidder()}</div>
						<div className="auction-normal">{this.prop.myauction.starttime}{formatTime.format('yyyy/MM/dd hh:mm:ss', detail.startTime.blocktime.toString(), this.props.intl.locale)}</div>
						<div className="auction-normal">{this.prop.myauction.info.mybidmsg}<span className="text-red">{detail.addWho.totalValue} </span> CGAS</div>   {/*todo  出价总和怎么求*/ /*这一看就是你男票帮你写的吧*/ }
					</div>
				</div>
			</React.Fragment>
		);
	}
}
export default injectIntl(Detail);