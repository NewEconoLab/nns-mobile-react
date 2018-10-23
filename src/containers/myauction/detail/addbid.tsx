// 加价模块
import * as React from 'react';
import {observer, inject} from 'mobx-react';
import '../index.less';
import close from '@/img/close.png';
import Input from '@/components/Input/Input';
import {Button} from 'antd-mobile';
import { IAuctionAddbidProps } from "@/containers/myauction/interface/index.interface";
import { nnstools } from '@/utils/nnstools';
import DomainSelling from '@/store/DomainSelling';
import { IAuction } from '@/store/interface/auction.interface';
import { injectIntl } from 'react-intl'
import Alert from '@/components/alert';

// 获取竞拍状态：getauctionstate 参数：域名
@inject('common','myauction')
@observer

class Addbid extends React.Component<IAuctionAddbidProps>{
    
  public prop = this.props.intl.messages;
      public change = (value:string) => {
          this.props.myauction.myBid = value;
      }
      public addBid = async ()=>
      {
          const auction = this.props.myauction.detail as IAuction;
          try {
            const res = await nnstools.raise(auction.auctionId,this.props.myauction.myBid,DomainSelling.RootNeo.register);
            if(res)
            {
              Alert(this.prop.message.successmsg, this.prop.message.waitmsg, this.prop.btn.confirm,  ()=>{
                  return;
              });
            }
          } catch (error) {
              console.log(error);
              
          }
      }

    public onClose = () => {
        this.props.myauction.showDialog = false;
    }
    public render(){
        return(
            <div className="addbid-wrapper">
                <div className="addbid-box">
                    <div className="addbid-title">
                        <h2>竞拍出价</h2>
                        <div className="close-addbid" onClick={this.onClose}>
                            <img src={close} alt=""/>
                        </div>
                    </div>
                    <div className="addbid-content">
                        <div className="addbid-account">竞拍账户余额： {this.props.common.accountBalance} CGAS</div>                    
                        <div className="addbid-amount">
                            <span className="addbid-text">本次加价：</span>
                            <Input 
                                placeholder=""
                                style={{width: 200}}
                                status=""
                                message=""
                                value={this.props.myauction.myBid}
                                onChange={this.change}
                                type="text"
                            />
                            <span className="addbid-text">CGAS</span>
                        </div>      
                    </div>
                    <div className="addbid-tips">
                        <span>注意：每次加价最小单位为 0.1 CGAS，当出价总和小于该域名的当前最高价时，本次出价不成功。</span>
                    </div>
                    <Button type="primary"  onClick={this.addBid} style={{borderRadius:'0'}} className="detail-btn">出价</Button>
                </div>
            </div>
            
        )
    }
}


export default injectIntl(Addbid);