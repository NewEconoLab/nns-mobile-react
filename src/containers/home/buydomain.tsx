// 加价模块
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import close from '@/img/close.png';
import { Button } from 'antd-mobile';
import { nnstools } from '@/utils/nnstools';
// import DomainSelling from '@/store/DomainSelling';
import { injectIntl } from 'react-intl'
import Alert from '@/components/alert';
import taskmanager from '@/store/taskmanager';
import { Task, ConfirmType, TaskType } from '@/store/interface/taskmanager.interface';
import { IHomeProps } from './interface/home.interface';
import * as formatTime from 'utils/formatTime';
import common from '@/store/common';
import classnames from 'classnames';

// 获取竞拍状态：getauctionstate 参数：域名
@inject('common', 'home')
@observer
class BuyDomain extends React.Component<IHomeProps>{
    public prop = this.props.intl.messages;

    public async componentDidMount(){
        await this.props.home.getSaleDomainInfo();
        await this.props.home.getnep5balanceofaddress();
    }
    public onBuyDomain = async () => {
        const domain = this.props.home.sellingDomain?this.props.home.sellingDomain.domain:'';
        const price = this.props.home.sellingDomain? this.props.home.sellingDomain.price:'0';
        if(price === '0'){
            return
        }
        this.props.statemanager.buyDomainState.push(domain);
        const res = await nnstools.getAllMyNNC()
        if (res && res["txid"]){
            const txid = res["txid"];            
            taskmanager.addTask(
                new Task(
                    TaskType.buyDomain, 
                    ConfirmType.recharge, 
                    txid, 
                    { domain:domain, price: price }
                )
            );

            Alert(this.prop.message.successmsg, this.prop.message.waitmsg, this.prop.btn.confirm, () =>
            {
                console.log("成功了");
            });
        }else
        {
          Alert(this.prop.message.errmsg, this.prop.message.errmsgtip1, this.prop.btn.confirm, () =>
          {
            return;
          });
          this.props.statemanager.buyDomainStateDel(domain);
        }
        this.onClose();
    }
    public onDelistDomain = async () =>{
        console.log("send delist");
        const domain = this.props.home.sellingDomain?this.props.home.sellingDomain.domain:'';
        this.props.statemanager.delistDomainState.push(domain);
        const res = await nnstools.unSaleDomain(domain)
        if (res && res["txid"]){
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
        }else
        {
          Alert(this.prop.message.errmsg, this.prop.message.errmsgtip1, this.prop.btn.confirm, () =>
          {
            return;
          });
          this.props.statemanager.delistDomainStateDel(domain);
        }
    }

    public onClose = () => {
        console.log("close buy");
        this.props.home.isShowSaleBox = false;
        this.props.home.isStatus = 0;
        this.props.home.inputModule.inputValue = '';
    }
    public render() {
        const time = this.props.home.sellingDomain ? this.props.home.sellingDomain.ttl : 0;
        const btnClassName = classnames('detail-btn',
			{
				'ghost': this.props.home.isOKBuy ? this.props.home.isOKBuy : false,
			}) 
        return (
            <div className="saledomain-wrapper">
                <div className="saledomain-box">
                    <div className="saledomain-title">
                        <h2>域名详情</h2>
                        <div className="close-saledomain" onClick={this.onClose}>
                            <img src={close} alt="" />
                        </div>
                    </div>
                    <div className="saledomain-content">
                        <div className="saledomain-text">
                            域名：{this.props.home.sellingDomain && this.props.home.sellingDomain.domain}
                        </div>
                        <div className="saledomain-text">
                            域名到期时间：{formatTime.format('yyyy/MM/dd hh:mm:ss', time.toString(), this.props.intl.locale)}
                        </div>
                        <div className="saledomain-text">
                            出售价格：{this.props.home.sellingDomain && this.props.home.sellingDomain.price} NNC
                        </div>
                    </div>
                    {
                        (this.props.home.sellingDomain && this.props.home.sellingDomain.owner === common.address) && (
                            <Button type="primary" style={{ borderRadius: '0' }} className="detail-btn" onClick={this.onDelistDomain}>下架</Button>
                        )
                    }
                    {
                        (this.props.home.sellingDomain && this.props.home.sellingDomain.owner !== common.address) && (
                            <Button type="primary" style={{ borderRadius: '0' }} className={btnClassName} onClick={this.onBuyDomain} disabled={this.props.home.isOKBuy}>
                                购买
                                {!!!this.props.home.isOKBuy && <span style={{fontSize:'12px'}}>（余额不足）</span>}
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