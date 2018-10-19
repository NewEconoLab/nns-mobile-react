/**
 * 我的竞拍列表
 */
import * as React from 'react';
import { injectIntl } from 'react-intl';
import TitleText from '@/components/titletext';
import Hint from '@/components/hint';
// import q1 from '@/img/q1.png'
// import q2 from '@/img/q2.png'
import './index.less'
import { Button } from 'antd-mobile';
import { IAuctionListProps } from './interface/index.interface';
import * as formatTime from 'utils/formatTime';
import { AuctionState } from '@/store/interface/auction.interface';
// 根据竞拍id查询竞拍信息 getauctioninfobyaucitonid
// 获取域名信息 getdomaininfo 参数：域名
/**
 *   "owner": "ALUGqCZMFWoJBsd2qYhp5ckDVrap5RbSMJ",
 *   "register": "",
 *   "resolver": "0x6e2aea28af9c5febea0774759b1b76398e3167f1",
 *   "TTL": "1568975107",
 *   "parentOwner": "AMNFdmGuBrU1iaMbYd63L1zucYMdU9hvQU",
 *   "root": "0"
 */
class MyAuctionList extends React.Component<IAuctionListProps>
{
	// 跳转到竞拍详情页
	public onGotoDetail = () => {
		this.props.myauction.detail = this.props.item;
		this.props.history.push('/auction/detail')
	}

	public bidder = () => {
		const address = this.props.item.maxBuyer.replace(/^(\w{4})(.*)(\w{4})$/, '$1...$3');
		if (this.props.item.maxBuyer === this.props.common.address) {
			return <span className="auction-me">我（ {address} ）</span>
		}
		return <span>他人（ {address} ）</span>
	}
	public btnStatus = () => {
		if (this.props.item.maxBuyer === this.props.common.address) {
			return <Button type="primary" inline={true} size="small">领取域名</Button>
		}
		return <Button type="primary" inline={true} size="small">领回竞拍金</Button>
	}
	public render() {
		const item = this.props.item;
		console.log("列表页");

		console.log(item);
		return (
			<div className="myauction-wrap box-wrap">
				<TitleText text="竞拍域名">
					<div className="status-group">
						{
							item.auctionState === AuctionState.end &&
							<div>
								<span>状态：</span>
								<span className="status-end">已结束</span>
							</div>
						}
						{
							item.auctionState === AuctionState.random &&
							<div>
								<span>状态：</span>
								<span className="status-random">随机期</span>
								<Hint />
							</div>
						}
						{
							item.auctionState === AuctionState.fixed &&
							<div>
								<span>状态：</span>
								<span className="status-being">确定期</span>
								<Hint />
							</div>
						}
					</div>
				</TitleText>
				<div onClick={this.onGotoDetail}>
					<div className="myauction-list">
						<div className="list-left">
							<div className="auction-name">{item.domain}</div>
							<div className="auction-normal">当前最高价：{item.maxPrice} CGAS</div>
							<div className="auction-normal">出价者：{this.bidder()}</div>
							<div className="auction-normal">开标时间：{formatTime.format('yyyy/MM/dd hh:mm:ss', this.props.item.startTime.blocktime.toString(), this.props.intl.locale)}</div>
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
