/**
 * 操作记录列表
 */
import * as React from 'react';
import direction from '@/img/direction2.png'
import './index.less'
import { IRecordListProps, IRecordListState } from './interface/record.interface';
import { TaskType } from '@/store/interface/taskmanager.interface';

export default class RecordList extends React.Component<IRecordListProps, IRecordListState>
{
    public state = {
        clodTime: 0,
        noSetTime: false,
    }
    public text = {
        [TaskType.openAuction]: '开标',
        [TaskType.addPrice]: '加价',
        [TaskType.topup]: '充值',
        [TaskType.withdraw]: '提取',
        [TaskType.domainRenewal]: '域名编辑',
        [TaskType.domainMapping]: '域名编辑',
        [TaskType.domainResovle]: '域名编辑',
        [TaskType.gasToSgas]: '兑换CGAS',
        [TaskType.sgasToGas]: '兑换GAS',
        [TaskType.getGasTest]: '领取GAS',
        [TaskType.getDomain]: '领取域名',
        [TaskType.recoverSgas]: '退回CGAS',
        [TaskType.ClaimGas]: '领取GAS',
        [TaskType.tranfer]: '交易确认',
    }

    public componentDidMount() {
        // this.setTime();
        // if (!this.state.noSetTime) {
        //     const timer = setInterval(() => {
        //         this.setTime(timer);
        //     }, 1000)
        // }
    }

    public setTime = (timer?: any) => {
        if (this.props.item.state !== 0) {
            if (timer) {
                clearInterval(timer);
            }
            return false;
        }
        const num = new Date().getTime() - this.props.item.startTime;
        this.setState({
            clodTime: parseInt((num / 1000).toString(), 10)
        });

        return true;
    }

    public render() {
        const item = this.props.item;
        const txidtext = item.txid.replace(/^(\w{4})(.*)(\w{4})$/, '$1...$3');
        return (
            <React.Fragment>
                {/* 兑换CGAS */}
                {
                    (item['categoryType'] === TaskType.gasToSgas || item['categoryType'] === TaskType.sgasToGas) &&
                    <div className="list-wrapper">
                        <div className="list-up">
                            <div className="up-left">
                                <div className="btn-wrapper">{this.text[item['categoryType']]}</div>
                            </div>
                            <div className="up-right">
                                <div className="upright-down">
                                    {
                                        item['categoryType'] === TaskType.gasToSgas &&
                                        <>
                                            <span>{item.message.amount} GAS</span>
                                            <img src={direction} alt="" />
                                            <span>{item.message.amount} CGAS</span>
                                        </>
                                    }
                                    {
                                        item['categoryType'] === TaskType.sgasToGas &&
                                        <>
                                            <span>{item.message.amount} CGAS</span>
                                            <img src={direction} alt="" />
                                            <span>{item.message.amount} GAS</span>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="list-down">
                            <span>TXID:&nbsp;&nbsp;<a href="#" className="text-green">{txidtext}</a></span>
                            {
                                this.props.item.state === 0 && <span>Status:&nbsp;&nbsp;<span className="text-red">等待确认...( {this.state.clodTime}s )</span></span>
                            }
                            {
                                this.props.item.state === 2 && <span>Status:&nbsp;&nbsp;<span className="text-red">操作失败</span></span>
                            }
                        </div>
                    </div>
                }
                {/* 开标 或 领取域名*/}
                {
                    (item['categoryType'] === TaskType.openAuction || item['categoryType'] === TaskType.getDomain) &&
                    <div className="list-wrapper">
                        <div className="list-up">
                            <div className="up-left">
                                <div className="btn-wrapper">{this.text[item['categoryType']]}</div>
                            </div>
                            <div className="up-right">
                                <div className="upright-down">
                                    <a href="#" className="text-green">{item.message.domain}</a>
                                </div>
                            </div>
                        </div>
                        <div className="list-down">
                            <span>TXID:&nbsp;&nbsp;<a href="#" className="text-green">{txidtext}</a></span>
                            {
                                this.props.item.state === 0 && <span>Status:&nbsp;&nbsp;<span className="text-red">等待确认...( {this.state.clodTime}s )</span></span>
                            }
                            {
                                this.props.item.state === 2 && <span>Status:&nbsp;&nbsp;<span className="text-red">操作失败</span></span>
                            }
                        </div>
                    </div>
                }

                {/* 加价 或 领回CGAS 域名编辑*/}
                {
                    (item['categoryType'] === TaskType.addPrice || item['categoryType'] === TaskType.recoverSgas
                        || item['categoryType'] === TaskType.domainRenewal || item['categoryType'] === TaskType.domainMapping
                        || item['categoryType'] === TaskType.domainResovle) &&
                    <div className="list-wrapper">
                        <div className="list-up">
                            <div className="up-left">
                                <div className="btn-wrapper">{this.text[item['categoryType']]}</div>
                            </div>
                            <div className="up-right">
                                <div className="upright-up"><a href="#" className="text-green">{item.message.domain}</a> </div>
                                {
                                    (item['categoryType'] === TaskType.addPrice || item['categoryType'] === TaskType.recoverSgas) &&
                                    <div className="upright-down">{item.message.amount} CGAS</div>
                                }
                                {
                                    item['categoryType'] === TaskType.domainRenewal &&
                                    <div className="upright-down">续约至：2019/08/14 10:20:20</div>
                                }
                                {
                                    item['categoryType'] === TaskType.domainMapping &&
                                    <div className="upright-down">地址映射：{item.message.address.replace(/^(\w{6})(.*)(\w{6})$/, '$1...$3')}</div>
                                }
                                {
                                    item['categoryType'] === TaskType.domainResovle &&
                                    <div className="upright-down">地址解析器：{item.message.contract.replace(/^(\w{6})(.*)(\w{6})$/, '$1...$3')}</div>
                                }
                            </div>
                        </div>
                        <div className="list-down">
                            <span>TXID:&nbsp;&nbsp;<a href="#" className="text-green">{txidtext}</a></span>
                            {
                                this.props.item.state === 0 && <span>Status:&nbsp;&nbsp;<span className="text-red">等待确认...( {this.state.clodTime}s )</span></span>
                            }
                            {
                                this.props.item.state === 2 && <span>Status:&nbsp;&nbsp;<span className="text-red">操作失败</span></span>
                            }
                        </div>
                    </div>
                }

                {/* 充值 或 提取 */}
                {
                    (item['categoryType'] === TaskType.topup || item['categoryType'] === TaskType.withdraw) &&
                    <div className="list-wrapper">
                        <div className="list-up">
                            <div className="up-left">
                                <div className="btn-wrapper">{this.text[item['categoryType']]}</div>
                            </div>
                            <div className="up-right">
                                <div className="upright-down">
                                    <span>{item.message.amount} CGAS</span>
                                </div>
                            </div>
                        </div>
                        <div className="list-down">
                            <span>TXID:&nbsp;&nbsp;<a href="#" className="text-green">{txidtext}</a></span>
                            {
                                this.props.item.state === 0 && <span>Status:&nbsp;&nbsp;<span className="text-red">等待确认...( {this.state.clodTime}s )</span></span>
                            }
                            {
                                this.props.item.state === 2 && <span>Status:&nbsp;&nbsp;<span className="text-red">操作失败</span></span>
                            }
                        </div>
                    </div>
                }

            </React.Fragment>
        );
    }
}
