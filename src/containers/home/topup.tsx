
/**
 * nns主页下充值功能
 */
import * as React from 'react';
import { Button,WingBlank } from 'antd-mobile';
import account from '@/img/auctionaccount.png'
import balance from '@/img/balance.png'
import direction from '@/img/direction1.png'
import Input from '@/components/Input/Input'
import './index.less'
import TitleText from '@/components/titletext';
interface IState {
    inputValue:string,
    message:string,
    status:string
  }

  // 发送交易接口sendrawtransaction 传参：已附加签名鉴证的txHex
export default class Topup extends React.Component<{}, IState>
{
    constructor(props:any) {
        super(props);
        this.state = {
          inputValue:"",
          status:"",
          message:""
        }
      }
      public change = (value:string) => {
        this.setState({
          inputValue:value,
          status:'error',
          message:'erroroooorrrr'
        });
      }
  public render()
  {
    return (
      <div className="topup-wrap">
        <TitleText text="充值CGAS"/>
        <div className="change-wrapper">
            <div className="change-left">
                <img src={balance} alt="" className="wallet-img"/>
                <h2 className="h2-text">钱包</h2>
                <span className="change-number">余额： 100</span>
            </div>
            <div className="change-middle">
                <img src={direction} alt="" className="direction-img"/>
            </div>
            <div className="change-right">
                <img src={account} alt="" className="wallet-img"/>
                <h2 className="h2-text">竞拍账户</h2>
                <span className="change-number">余额： 100</span>
            </div>
        </div>
        <TitleText text="充值数量"/>
        <div className="amount-number">
            <Input 
                placeholder=""
                style={{width: 345}}
                status=""
                message="所需CGAS数量：99"
                value={this.state.inputValue}
                onChange={this.change}
                type="text"
            />
            <span className="input-right">全部</span>
        </div>
        <div className="topup-footer">
            <WingBlank><Button type="primary">充值</Button></WingBlank>
        </div>
      </div>
    );
  }
}