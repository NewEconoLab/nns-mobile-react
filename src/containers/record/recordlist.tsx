/**
 * 操作记录列表
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import direction from '@/img/direction2.png'
import './index.less'
import { IRecordListProps, IRecordListState } from './interface/record.interface';
import { TaskType } from '@/store/interface/taskmanager.interface';
import * as formatTime from 'utils/formatTime';
import { injectIntl } from 'react-intl';

@observer
class RecordList extends React.Component<IRecordListProps, IRecordListState>
{
  public state = {
    clodTime: 0,
    noSetTime: false,
  }
  public prop = this.props.intl.messages;
  public text = {
    [TaskType.startAuction]: this.prop.record.startauction,
    [TaskType.raise]: this.prop.record.raisebid,
    [TaskType.topup]: this.prop.record.topup,
    [TaskType.withdraw]: this.prop.record.withdraw,
    [TaskType.domainRenewal]: this.prop.record.editdomain,
    [TaskType.domainMapping]: this.prop.record.editdomain,
    [TaskType.domainResovle]: this.prop.record.editdomain,
    [TaskType.gasToSgas]: this.prop.record.cgasexchange,
    [TaskType.sgasToGas]: this.prop.record.cgasexchange,
    [TaskType.collectDomain]: this.prop.record.claimdomain,
    [TaskType.recoverCgas]: this.prop.record.reclaimcgas,
    [TaskType.tranfer]: this.prop.record.domaintransfer,
    [TaskType.saleDomain]: this.prop.record.list,
    [TaskType.unSaleDomain]: this.prop.record.delist,
    [TaskType.buyDomain]: this.prop.record.buy,
    [TaskType.getMyNNC]: this.prop.record.claimnnc,
  }

  public componentDidMount()
  {
    this.setTime();
    if (!this.state.noSetTime)
    {
      const timer = setInterval(() =>
      {
        this.setTime(timer);
      }, 1000)
    }
  }

  public setTime = (timer?: any) =>
  {
    if (this.props.item.state !== 0)
    {
      if (timer)
      {
        clearInterval(timer);
        this.setState({
          clodTime: 0,
        })
      }
      return false;
    }
    const num = new Date().getTime() - this.props.item.startTime;
    this.setState({
      clodTime: parseInt((num / 1000).toString(), 10)
    });

    return true;
  }

  public render()
  {
    const item = this.props.item;
    const txidtext = item.txid.replace(/^(\w{4})(.*)(\w{4})$/, '$1...$3');
    return (
      <React.Fragment>
        <div className="list-wrapper">
          {/* 兑换CGAS */}
          {
            (item.taskType === TaskType.gasToSgas || item.taskType === TaskType.sgasToGas) &&
            <div className="list-up">
              <div className="up-left">
                <div className="btn-wrapper">{this.text[item.taskType]}</div>
              </div>
              <div className="up-right">
                <div className="upright-up">
                  {
                    item.taskType === TaskType.gasToSgas &&
                    <>
                      <span>{item.message.amount} GAS</span>
                      <img src={direction} alt="" />
                      <span>{item.message.amount} CGAS</span>
                    </>
                  }
                  {
                    item.taskType === TaskType.sgasToGas &&
                    <>
                      <span>{item.message.amount} CGAS</span>
                      <img src={direction} alt="" />
                      <span>{item.message.amount} GAS</span>
                    </>
                  }
                </div>
              </div>
            </div>
          }
          {/* 开标 或 领取域名 或 下架*/}
          {
            (
              item.taskType === TaskType.startAuction ||
              item.taskType === TaskType.collectDomain ||
              item.taskType === TaskType.unSaleDomain) &&
            <div className="list-up">
              <div className="up-left">
                <div className="btn-wrapper">{this.text[item.taskType]}</div>
              </div>
              <div className="up-right">
                <div className="upright-up">
                  <a href="#" className="text-green">{item.message.domain}</a>
                </div>
              </div>
            </div>
          }
          {/* 加价 或 领回CGAS 或 域名编辑 或 出售 转让 购买*/}
          {
            (item.taskType === TaskType.raise || item.taskType === TaskType.recoverCgas
              || item.taskType === TaskType.domainRenewal || item.taskType === TaskType.domainMapping
              || item.taskType === TaskType.domainResovle
              || item.taskType === TaskType.saleDomain
              || item.taskType === TaskType.tranfer
              || item.taskType === TaskType.buyDomain) &&
            <div className="list-up">
              <div className="up-left">
                <div className="btn-wrapper">{this.text[item.taskType]}</div>
              </div>
              <div className="up-right">
                <div className="upright-up"><a href="#" className="text-green">{item.message.domain}</a> </div>
                {
                  (item.taskType === TaskType.raise || item.taskType === TaskType.recoverCgas) &&
                  <div className="upright-down">{item.message.amount} CGAS</div>
                }
                {
                  (item.taskType === TaskType.saleDomain || item.taskType === TaskType.buyDomain) &&
                  <div className="upright-down">{item.message.price} NNC</div>
                }
                {
                  item.taskType === TaskType.tranfer &&
                  <div className="upright-down">{item.message.address.replace(/^(\w{6})(.*)(\w{6})$/, '$1...$3')}</div>
                }
                {
                  item.taskType === TaskType.domainRenewal &&
                  <div className="upright-down">{formatTime.format('yyyy/MM/dd hh:mm:ss', item.message.time.toString(), this.props.intl.locale)}</div>
                }
                {
                  item.taskType === TaskType.domainMapping &&
                  <div className="upright-down">{this.prop.record.mapping}{item.message.address.replace(/^(\w{6})(.*)(\w{6})$/, '$1...$3')}</div>
                }
                {
                  item.taskType === TaskType.domainResovle &&
                  <div className="upright-down">{this.prop.record.resolver}{item.message.contract.replace(/^(\w{6})(.*)(\w{6})$/, '$1...$3')}</div>
                }
              </div>
            </div>
          }
          {/* 充值 或 提取 或 提取nnc */}
          {
            (item.taskType === TaskType.topup || item.taskType === TaskType.withdraw || item.taskType === TaskType.getMyNNC) &&
            <div className="list-up">
              <div className="up-left">
                <div className="btn-wrapper">{this.text[item.taskType]}</div>
              </div>
              <div className="up-right">
                {
                  (item.taskType === TaskType.topup || item.taskType === TaskType.withdraw) && (
                    <div className="upright-up">
                      <span>{item.message.amount} CGAS</span>
                    </div>
                  )
                }
                {
                  (item.taskType === TaskType.getMyNNC) && (
                    <div className="upright-up">
                      <span>{item.message.amount} NNC</span>
                    </div>
                  )
                }
              </div>
            </div>
          }
          <div className="list-down">
            <span>TXID:&nbsp;&nbsp;<a href="#" className="text-green">{txidtext}</a></span>
            {
              this.state.clodTime > 0 && <span>Status:&nbsp;&nbsp;<span className="text-red">{this.prop.record.waitingmsg}( {this.state.clodTime}s )</span></span>
            }
            {
              this.state.clodTime === 0 && this.props.item.state === 1 && <span>Status:&nbsp;&nbsp;<span className="text-green">{this.prop.record.successmsg}</span></span>
            }
            {
              this.state.clodTime === 0 && this.props.item.state === 2 && <span>Status:&nbsp;&nbsp;<span className="text-red">{this.prop.record.failmsg}</span></span>
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default injectIntl(RecordList);