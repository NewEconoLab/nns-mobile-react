/**
 * 我的竞拍列表
 */
import * as React from 'react';
import TitleText from '@/components/titletext';
import Hint from '@/components/hint';
// import q1 from '@/img/q1.png'
// import q2 from '@/img/q2.png'
import './index.less'
import { Button } from 'antd-mobile';
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
export default class MyAuctionList extends React.Component<any,any>
{
    public onGotoDetail = () => {
        this.props.history.push('/auction/detail/')
    }
    // public onClickEvent = (e:any)=>{
    //     console.log(e)
    //     const url = 'auction'
    //     this.props.history.push(url);       
    // }
    public render()
    {
        return (
            <div className="myauction-wrap box-wrap">
                <TitleText text="竞拍域名">
                    <div className="status-group">
                        <div>
                            <span>状态：</span>
                            <span className="status-being">确定期</span>
                            <Hint />
                            {/* <img src={q1} alt=""/> */}
                        </div>
                        {/* <div>
                    <span>状态：</span> 
                    <span className="status-random">确定期</span>
                </div>
                <div>
                    <span>状态：</span> 
                    <span className="status-end">已结束</span>
                </div> */}
                    </div>
                </TitleText>
                <div onClick={this.onGotoDetail}>
                    <div className="myauction-list">
                        <div className="list-left">
                            <div className="auction-name">balabala123.neo</div>
                            <div className="auction-normal">当前最高价：10 CGAS</div>
                            <div className="auction-normal">出价者：<span className="auction-me">他人（ ASH4...D9wk ）</span></div>
                            <div className="auction-normal">开标时间：2018/08/14 10:20:20</div>
                        </div>
                        <div className="list-right">
                            <Button type="primary" inline={true} size="small">领取域名</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
