// 加价模块
import * as React from 'react';
import '../index.less';
import close from '@/img/close.png';
import Input from '@/components/Input/Input';
import { IAuctionProps } from "@/containers/myauction/interface/index.interface";

export default class Addbid extends React.Component<IAuctionProps>{
    
      public change = (value:string) => {
          this.props.myauction.myBid = value;
        // this.setState({
        //   inputValue:value,
        //   status:'error',
        //   message:'erroroooorrrr'
        // });
      }
    public render(){
        return(
            <div className="addbid-wrapper">
                <div className="addbid-box">
                    <div className="addbid-title">
                        <h2>竞拍出价</h2>
                        <div className="close-addbid">
                            <img src={close} alt=""/>
                        </div>
                    </div>
                    <div className="addbid-content">
                        <div className="addbid-account">竞拍账户余额： 99 CGAS</div>                    
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
                </div>
            </div>
            
        )
    }
}