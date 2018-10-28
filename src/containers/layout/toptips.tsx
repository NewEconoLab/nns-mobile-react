import * as React from 'react';
import {observer} from 'mobx-react';
import {ITaskmanagerStore, TaskType} from '@/store/interface/taskmanager.interface'
import {NoticeBar} from 'antd-mobile';
import './toptips.less';

interface IProps {
  taskmanager:ITaskmanagerStore
}

const textList = {
  startAuction: (domain) => `域名开标 ${domain} 已生效！`,
  raise: (msg) => `域名加价 ${msg.domain} （ ${msg.amount} CGAS ）已生效！`,// 资产更新 在tx交易成功后添加资产更新任务，资产更新立即执行
  topup: (amount) => `充值 ${amount} 已生效！`,// 充值
  withdraw: (amount) => `提取 ${amount} 已生效！`,// 退款
  domainRenewal: (domain) => `续约域名 ${domain} 已生效！`,// 域名续约
  domainMapping: (msg) => `地址映射 ${msg.domain} ( ${msg.address.replace(/^(\w{6})(.*)(\w{6})$/, '$1...$3')} )已生效！`,// 域名映射
  domainResovle: (domain) => `设置地址解析器  ${domain} 已生效！`,// 域名合约地址
  gasToSgas: (amount) => `兑换CGAS ( ${amount} GAS ${amount} CGAS )已生效！`,// gas转sgas
  sgasToGas: (amount) => `兑换GAS ( ${amount} CGAS ${amount} GAS ) 已生效！`,// sgas转gas
  collectDomain: (domain) => `领域域名 ${domain} 已生效！`,// 领取域名
  recoverCgas: (amount) => `领回CGAS ${amount} 已生效！`,// 退回sgas
}

@observer
export default class TopTips extends React.Component<IProps> {
  public renderNoticeText = () => {
    const item = this.props.taskmanager.selfTask;
    if(!item) {
      return '';
    }
    if(item.state !== 1) {
      return '';
    }
    if(item.taskType === TaskType.startAuction) {
      return textList.startAuction(item.message.domain)
    }
    if(item.taskType === TaskType.raise) {
      return textList.raise(item.message)
    }
    if(item.taskType === TaskType.topup) {
      return textList.topup(item.message.amount)
    }
    if(item.taskType === TaskType.withdraw) {
      return textList.withdraw(item.message.amount)
    }
    if(item.taskType === TaskType.domainRenewal) {
      return textList.domainRenewal(item.message.domain)
    }
    if(item.taskType === TaskType.domainMapping) {
      return textList.domainMapping(item.message)
    }
    if(item.taskType === TaskType.domainResovle) {
      return textList.domainResovle(item.message.domain)
    }
    if(item.taskType === TaskType.gasToSgas) {
      return textList.gasToSgas(item.message.amount)
    }
    if(item.taskType === TaskType.sgasToGas) {
      return textList.sgasToGas(item.message.amount)
    }
    if(item.taskType === TaskType.collectDomain) {
      return textList.collectDomain(item.message.domain)
    }
    if(item.taskType === TaskType.recoverCgas) {
      return textList.recoverCgas(item.message.amount)
    }

    return '';
  }
  public render() {

    return (
      <div className="comp-top-tips-container">
      {
        this.props.taskmanager.selfTask && this.renderNoticeText() && <NoticeBar style={{'background': '#E3F3FF', color:'#22A4FF'}} marqueeProps={{ loop: true, style: { padding: '0 7.5px' },text:this.renderNoticeText() }} />
      }
      </div>
    );
  }
}