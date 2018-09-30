
/**
 * nns主页提取功能
 */
import * as React from 'react';
import { Button,WingBlank } from 'antd-mobile';
import {observer,inject} from 'mobx-react'
import account from '@/img/auctionaccount.png'
import balance from '@/img/balance.png'
import direction from '@/img/direction1.png'
import Input from '@/components/Input/Input'
import './index.less'
import TitleText from '@/components/titletext';
import { IHomeProps } from './interface/home.interface';
import common from '@/store/common';
interface IState {
    inputValue:string,
    message:string,
    status:string
}

@inject('home')
@observer
export default class Withdraw extends React.Component<IHomeProps, IState>
{
    constructor(props:any) {
        super(props);
        this.state = {
          inputValue:"",
          status:"",
          message:""
        }
      }
      public async componentDidMount(){
        await this.props.home.getnep5balanceofaddress();
        console.log(common.cgasBalance);
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
        <TitleText text="提取CGAS"/>
        <div className="change-wrapper">
            <div className="change-left">
                <img src={account} alt="" className="wallet-img"/>
                <h2 className="h2-text">竞拍账户</h2>
                <span className="change-number">余额： {common.accountBalance}</span>
            </div>
            <div className="change-middle">
                <img src={direction} alt="" className="direction-img"/>
            </div>
            <div className="change-right">
                <img src={balance} alt="" className="wallet-img"/>
                <h2 className="h2-text">钱包</h2>
                <span className="change-number">余额： {common.cgasBalance}</span>
                
            </div>
        </div>
        <TitleText text="提取数量"/>
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
            <WingBlank><Button type="primary">提取</Button></WingBlank>
        </div>
      </div>
    );
  }
}