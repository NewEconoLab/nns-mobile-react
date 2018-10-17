/**
 * 我的竞拍域名详情页
 */
import * as React from 'react';
import {injectIntl} from 'react-intl';
import {inject, observer} from 'mobx-react';
import Detail from './detail'
import TimeList from './timelist'
import Addbid from './addbid'
import { Button } from 'antd-mobile';
import {IAuctionDetailProps, IAuctionList} from '../interface/index.interface';
import '../index.less'
import { nnstools } from '@/utils/nnstools';
import DomainSelling from '@/store/DomainSelling';

@inject('myauction', 'common')
@observer
class DomainDetail extends React.Component<IAuctionDetailProps>
{
    public prop = this.props.intl.messages;
    public addBid = async ()=>
    {
        const auction = this.props.myauction.detail as IAuctionList;
        try {
            alert(this.props.myauction.myBid);
          const res = await nnstools.raise(auction.auctionId,this.props.myauction.myBid,DomainSelling.RootNeo.register);
          if(res)
          {
            // Alert(this.prop.message.successmsg, this.prop.message.waitmsg, this.prop.btn.confirm, function () {
            //   alert('我点击了确认按钮')
            // });
          }
        } catch (error) {
            console.log(error);
            
        }
    }

    public componentDidMount() {
        if(!this.props.myauction.detail) {
            this.props.history.goBack();
        }
    }
    public render()
    {
        // todo 时间轴还没写，出价还没写
        return (
            <div className="domain-detail-wrapper">
                <Detail {...this.props}/>
                <TimeList/>   
                <div className="detail-footer">
                    <Addbid {...this.props} />
                    <Button type="primary"  onClick={this.addBid} style={{borderRadius:'0'}} className="detail-btn">出价</Button>
                </div>
            </div>
        );
    }
    
}

export default injectIntl(DomainDetail)