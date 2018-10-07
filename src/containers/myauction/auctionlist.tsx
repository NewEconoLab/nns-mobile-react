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
	public onGotoDetail = () => {
		this.props.myauction.detail = this.props.item;
		this.props.history.push('/auction/detail')
	}
	// public onClickEvent = (e:any)=>{
	//     console.log(e)
	//     const url = 'auction'
	//     this.props.history.push(url);       
	// }
	public bidder = () => {
		const address = this.props.item.maxBuyer.replace(/^(\w{4})(.*)(\w{4})$/, '$1...$3');
		if (this.props.item.maxBuyer === this.props.common.address) {
			return <span className="auction-me">我（ {address} ）</span>
		}
		return <span>他人（ {address} ）</span>
	}
	public render() {
		const item = this.props.item;
		return (
			<div className="myauction-wrap box-wrap">
				<TitleText text="竞拍域名">
					<div className="status-group">
						{/* todo state 不确定  */}
						{
							item.auctionState === '0401' &&
							<div>
								<span>状态：</span>
								<span className="status-end">已结束</span>
							</div>
						}
						{/* todo state 不确定  */}
						{
							item.auctionState === '0301' &&
							<div>
								<span>状态：</span>
								<span className="status-random">随机期</span>
								<Hint />
							</div>
						}
						{/* todo  state 不确定 */}
						{
							item.auctionState === '0201' &&
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
							<div className="auction-normal">开标时间：{formatTime.format('yyyy/MM/dd hh:mm:ss', this.props.item.startTime.blocktime, this.props.intl.locale)}</div>
						</div>
						<div className="list-right">
						{/* todo 按钮状态 */}
							<Button type="primary" inline={true} size="small">领取域名</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default injectIntl(MyAuctionList);
