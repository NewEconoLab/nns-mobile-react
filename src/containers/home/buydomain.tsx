// 加价模块
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import close from '@/img/close.png';
import { Button } from 'antd-mobile';
import { nnstools } from '@/utils/nnstools';
import { injectIntl } from 'react-intl'
import Alert from '@/components/alert';
import taskmanager from '@/store/taskmanager';
import { Task, ConfirmType, TaskType } from '@/store/interface/taskmanager.interface';
import { IHomeProps } from './interface/home.interface';
import * as formatTime from 'utils/formatTime';
import common from '@/store/common';

@inject('common', 'home', 'statemanager')
@observer
class BuyDomain extends React.Component<IHomeProps>{
  public prop = this.props.intl.messages;

  public async componentDidMount()
  {
    await this.props.home.getSaleDomainInfo();
    await this.props.home.getnep5balanceofaddress();
  }
  // 购买操作
  public onBuyDomain = async () =>
  {
    const domain = this.props.home.sellingDomain ? this.props.home.sellingDomain.domain : '';
    const price = this.props.home.sellingDomain ? this.props.home.sellingDomain.price : '0';
    if (price === '0')
    {
      return
    }
    this.props.statemanager.buyDomainState.push(domain);
    const res = await this.domainBuy(domain, price);
    if (res)
    {
      Alert(this.prop.message.successmsg, this.prop.message.waitmsg, this.prop.btn.confirm, () =>
      {
        console.log("成功了");
      });
    } else
    {
      Alert(this.prop.message.errmsg, this.prop.message.errmsgtip1, this.prop.btn.confirm, () =>
      {
        return;
      }, 'error');
      this.props.statemanager.buyDomainStateDel(domain);
    }
    this.onClose();
  }
  // 购买发送交易
  public domainBuy = async (domain: string, amount: string) =>
  {
    const data1 = await nnstools.registerNNC(amount);
    const data2 = await nnstools.buyDomain(domain);
    if (data1)
    {
      await this.props.home.reChargeandtransfer(data1, data2);
      if(this.props.home.reChargeResult){
        switch (this.props.home.reChargeResult.errCode)
        {
          case '0000':// 成功
            taskmanager.addTask(
              new Task(
                TaskType.buyDomain,
                ConfirmType.recharge,
                this.props.home.reChargeResult.txid,
                { domain: domain, price: amount }
              )
            );
            return true;
          case '3001':// 失败
            break;
          case '3002':// 失败
            break;
        }
      }            
    }
    return false
  }
  // 下架发送交易
  public onDelistDomain = async () =>
  {
    const domain = this.props.home.sellingDomain ? this.props.home.sellingDomain.domain : '';
    if(domain === ''){
      return;
    }
    this.props.statemanager.delistDomainState.push(domain);
    const res = await nnstools.unSaleDomain(domain)
    if (res && res["txid"]!=='')
    {
      const txid = res["txid"];
      taskmanager.addTask(
        new Task(
          TaskType.unSaleDomain,
          ConfirmType.contract,
          txid,
          { domain: domain }
        )
      );

      Alert(this.prop.message.successmsg, this.prop.message.waitmsg, this.prop.btn.confirm, () =>
      {
        console.log("成功了");
      });
    } else
    {
      Alert(this.prop.message.errmsg, this.prop.message.errmsgtip1, this.prop.btn.confirm, () =>
      {
        return;
      }, 'error');
      this.props.statemanager.delistDomainStateDel(domain);
    }
  }

  public onClose = () =>
  {
    this.props.home.isShowSaleBox = false;
    this.props.home.isStatus = 0;
    this.props.home.inputModule.inputValue = '';
  }
  public render()
  {
    const time = this.props.home.sellingDomain ? this.props.home.sellingDomain.ttl : 0;
    return (
      <div className="saledomain-wrapper">
        <div className="saledomain-box">
          <div className="saledomain-title">
            <h2>{this.prop.home.buy.title}</h2>
            <div className="close-saledomain" onClick={this.onClose}>
              <img src={close} alt="" />
            </div>
          </div>
          <div className="saledomain-content">
            <div className="saledomain-text">
              {this.prop.home.buy.domain}{this.props.home.sellingDomain && this.props.home.sellingDomain.domain}
            </div>
            <div className="saledomain-text">
              {this.prop.home.buy.time}{formatTime.format('yyyy/MM/dd hh:mm:ss', time.toString(), this.props.intl.locale)}
            </div>
            <div className="saledomain-text">
              {this.prop.home.buy.price}{this.props.home.sellingDomain && this.props.home.sellingDomain.price} NNC
            </div>
          </div>
          {
            (this.props.home.sellingDomain && this.props.home.sellingDomain.owner === common.address) && (
              <Button type="primary" style={{ borderRadius: '0' }} className="detail-btn" onClick={this.onDelistDomain}>{this.prop.btn.delist}</Button>
            )
          }
          {
            (this.props.home.sellingDomain && this.props.home.sellingDomain.owner !== common.address) && (
              // <Button
              //   type="primary"
              //   style={{ borderRadius: '0' }} 
              //   className={btnClassName} 
              //   onClick={this.onBuyDomain} 
              //   disabled={!!!this.props.home.isOKBuy}
              // >
              //   {this.prop.btn.buy}
              //   {
              //     !!!this.props.home.isOKBuy && 
              //     <span style={{ fontSize: '12px' }}>{this.prop.home.buy.unbuy}</span>}
              // </Button>
              !!!this.props.home.isOKBuy ?
                <Button
                  type="ghost"
                  style={{ borderRadius: '0' }}
                  className="detail-btn ghost"
                  disabled={true}
                >
                  {this.prop.btn.buy}<span style={{ fontSize: '12px' }}>{this.prop.home.buy.unbuy}</span>
                </Button>
                : <Button
                  type="primary"
                  style={{ borderRadius: '0' }}
                  className="detail-btn"
                  onClick={this.onBuyDomain}
                >
                  {this.prop.btn.buy}
                </Button>
            )
          }

          {/* <Button type="primary" style={{ borderRadius: '0' }} className="detail-btn" loading={true}>购买</Button>
                    <Button type="primary" onClick={this.onBuyDomain} disabled={ this.props.home.isOKSale} style={{ borderRadius: '0' }} className="detail-btn" >购买</Button> */}
        </div>
      </div>
    )
  }
}


export default injectIntl(BuyDomain);