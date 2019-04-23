import * as React from 'react';
import {observer} from 'mobx-react';
import {ITaskmanagerStore, TaskType} from '@/store/interface/taskmanager.interface'
import {NoticeBar} from 'antd-mobile';
import classnames from 'classnames';
import './toptips.less';

interface IProps {
  taskmanager:ITaskmanagerStore,
  locale:any
}

@observer
export default class TopTips extends React.Component<IProps> {
  public textList = {
    startAuction: (domain,isok) => `${this.props.locale.startauctionmsg}${domain}${isok?this.props.locale.isok:this.props.locale.isnotok}`,// 开标
    raise: (msg,isok) => `${this.props.locale.raisebidmsg}${msg.domain} （ ${msg.amount} CGAS ）${isok?this.props.locale.isok:this.props.locale.isnotok}`,// 资产更新 在tx交易成功后添加资产更新任务，资产更新立即执行
    topup: (amount,isok) => `${this.props.locale.topupmsg}${amount}${isok?this.props.locale.isok:this.props.locale.isnotok}`,// 充值
    withdraw: (amount,isok) => `${this.props.locale.withdrawmsg}${amount}${isok?this.props.locale.isok:this.props.locale.isnotok}`,// 退款
    domainRenewal: (domain,isok) => `${this.props.locale.editdomainmsg3}${domain}${isok?this.props.locale.isok:this.props.locale.isnotok}`,// 域名续约
    domainMapping: (msg,isok) => `${this.props.locale.editdomainmsg2}${msg.domain} ( ${msg.address.replace(/^(\w{6})(.*)(\w{6})$/, '$1...$3')} )${isok?this.props.locale.isok:this.props.locale.isnotok}`,// 域名映射
    domainResovle: (domain,isok) => `${this.props.locale.editdomainmsg}${domain}${isok?this.props.locale.isok:this.props.locale.isnotok}`,// 域名合约地址
    gasToSgas: (amount,isok) => `${this.props.locale.exchangemsg}( ${amount} GAS → ${amount} CGAS )${isok?this.props.locale.isok:this.props.locale.isnotok}`,// gas转sgas
    sgasToGas: (amount,isok) => `${this.props.locale.exchangemsg}( ${amount} CGAS → ${amount} GAS ) ${isok?this.props.locale.isok:this.props.locale.isnotok}`,// sgas转gas
    collectDomain: (domain,isok) => `${this.props.locale.claimdomainmsg}${domain}${isok?this.props.locale.isok:this.props.locale.isnotok}`,// 领取域名
    recoverCgas: (amount,isok) => `${this.props.locale.reclaimmsg}${amount}${isok?this.props.locale.isok:this.props.locale.isnotok}`,// 退回sgas
    transferDomain:(msg,isok) => `${this.props.locale.domaintransfermsg}${msg.domain} ( ${msg.address.replace(/^(\w{6})(.*)(\w{6})$/, '$1...$3')} )${isok?this.props.locale.isok:this.props.locale.isnotok}`,// 域名转让
    saleDomain: (msg,isok) => `${this.props.locale.listmsg}${msg.domain} （ ${msg.price} NNC ）${isok?this.props.locale.isok:this.props.locale.isnotok}`,// 域名出售
    buyDomain: (msg,isok) => `${this.props.locale.buymsg}${msg.domain} （ ${msg.price} NNC ）${isok?this.props.locale.isok:this.props.locale.isnotok}`,// 域名购买
    getNNC: (amount,isok) => `${this.props.locale.claimnncmsg}${amount}${isok?this.props.locale.isok:this.props.locale.isnotok}`,// 提取nnc
    delistDomain: (domain,isok) => `${this.props.locale.delistmsg}${domain}${isok?this.props.locale.isok:this.props.locale.isnotok}`,// 下架
    bindDomain: (domain,isok) => `${this.props.locale.binddomain}${domain}${isok?this.props.locale.isok:this.props.locale.isnotok}`,// 绑定域名
    delBindDomain: (domain,isok) => `${this.props.locale.unbinddomain}${domain}${isok?this.props.locale.isok:this.props.locale.isnotok}`,// 取消绑定
  }
  public renderNoticeText = () => {
    const item = this.props.taskmanager.selfTask;
    if(!item) {
      return '';
    }
    if(item.state === 0) {
      return '';
    }
    if(item.taskType === TaskType.startAuction) {
      if(item.state === 1) {
        return this.textList.startAuction(item.message.domain,true);
      }else{
        return this.textList.startAuction(item.message.domain,false);
      }
    }
    if(item.taskType === TaskType.raise) {
      if(item.state === 1) {
        return this.textList.raise(item.message,true);
      }else{
        return this.textList.raise(item.message,false);
      }
    }
    if(item.taskType === TaskType.topup) {
      if(item.state === 1) {
        return this.textList.topup(item.message.amount,true);
      }else{
        return this.textList.topup(item.message.amount,false);
      }
    }
    if(item.taskType === TaskType.withdraw) {
      if(item.state === 1) {
        return this.textList.withdraw(item.message.amount,true);
      }else{
        return this.textList.withdraw(item.message.amount,false);
      }
    }
    if(item.taskType === TaskType.domainRenewal) {
      if(item.state === 1) {
        return this.textList.domainRenewal(item.message.domain,true);
      }else{
        return this.textList.domainRenewal(item.message.domain,false);
      }
    }
    if(item.taskType === TaskType.domainMapping) {
      if(item.state === 1) {
        return this.textList.domainMapping(item.message,true);
      }else{
        return this.textList.domainMapping(item.message,false);
      }
    }
    if(item.taskType === TaskType.domainResovle) {
      if(item.state === 1) {
        return this.textList.domainResovle(item.message.domain,true);
      }else{
        return this.textList.domainResovle(item.message.domain,false);
      }
    }
    if(item.taskType === TaskType.gasToSgas) {
      if(item.state === 1) {
        return this.textList.gasToSgas(item.message.amount,true);
      }else{
        return this.textList.gasToSgas(item.message.amount,false);
      }
    }
    if(item.taskType === TaskType.sgasToGas) {
      if(item.state === 1) {
        return this.textList.sgasToGas(item.message.amount,true);
      }else{
        return this.textList.sgasToGas(item.message.amount,false);
      }
    }
    if(item.taskType === TaskType.collectDomain) {
      if(item.state === 1) {
        return this.textList.collectDomain(item.message.domain,true);
      }else{
        return this.textList.collectDomain(item.message.domain,false);
      }
    }
    if(item.taskType === TaskType.recoverCgas) {
      if(item.state === 1) {
        return this.textList.recoverCgas(item.message.amount,true);
      }else{
        return this.textList.recoverCgas(item.message.amount,false);
      }
    }
    if(item.taskType === TaskType.tranfer) {
      if(item.state === 1) {
        return this.textList.transferDomain(item.message,true);
      }else{
        return this.textList.transferDomain(item.message,false);
      }
    }
    if(item.taskType === TaskType.saleDomain) {
      if(item.state === 1) {
        return this.textList.saleDomain(item.message,true);
      }else{
        return this.textList.saleDomain(item.message,false);
      }
    }
    if(item.taskType === TaskType.buyDomain) {
      if(item.state === 1) {
        return this.textList.buyDomain(item.message,true);
      }else{
        return this.textList.buyDomain(item.message,false);
      }
    }
    if(item.taskType === TaskType.getMyNNC) {
      if(item.state === 1) {
        return this.textList.getNNC(item.message.amount,true);
      }else{
        return this.textList.getNNC(item.message.amount,false);
      }
    }
    if(item.taskType === TaskType.unSaleDomain) {
      if(item.state === 1) {
        return this.textList.delistDomain(item.message.domain,true);
      }else{
        return this.textList.delistDomain(item.message.domain,false);
      }
    }
    if(item.taskType === TaskType.bindDoamin) {
      if(item.state === 1) {
        return this.textList.bindDomain(item.message.domain,true);
      }else{
        return this.textList.bindDomain(item.message.domain,false);
      }
    }
    if(item.taskType === TaskType.delBindDomain) {
      if(item.state === 1) {
        return this.textList.delBindDomain(item.message.domain,true);
      }else{
        return this.textList.delBindDomain(item.message.domain,false);
      }
    }

    return '';
  }
  public render() {
    const statusClassName = classnames({'success-color':this.props.taskmanager.selfTask && this.props.taskmanager.selfTask.state === 1,'fail-color':this.props.taskmanager.selfTask && this.props.taskmanager.selfTask.state === 2});
    return (
      <div className="comp-top-tips-container">
      {
        this.props.taskmanager.selfTask && this.renderNoticeText() && <NoticeBar className={statusClassName} marqueeProps={{ loop: true, style: { padding: '0 7.5px' },text:this.renderNoticeText() }} />
      }
      </div>
    );
  }
}