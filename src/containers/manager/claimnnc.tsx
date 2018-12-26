import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import { Button } from 'antd-mobile';
import { IManagerProps } from './interface/index.interface';
import { nnstools } from '@/utils/nnstools';
import Alert from '@/components/alert';
import { Task, ConfirmType, TaskType } from '@/store/interface/taskmanager.interface';
import taskmanager from '@/store/taskmanager';
@inject('manager', 'common')
@observer
class ClaimNNC extends React.Component<IManagerProps, any>
{
    public prop = this.props.intl.messages;
    public componentDidMount()
    {
        this.props.manager.getNNCfromSellingHash(this.props.common.address)
    }
    public toGetNNC = async () =>
    {
        console.log("send getnnc");
        this.props.statemanager.getSaleNNCState = true;
        const res = await nnstools.getAllMyNNC()
        if (res && res["txid"])
        {
            const txid = res["txid"];
            taskmanager.addTask(
                new Task(
                    TaskType.getMyNNC,
                    ConfirmType.contract,
                    txid,
                    { amount: this.props.manager.myNNCBalance }
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
            this.props.statemanager.getSaleNNCStateDel();
        }
    }
    public render()
    {
        const mynnc = parseFloat(this.props.manager.myNNCBalance);
        return (
            <div className="manager-mynnc">
                <div className="hastips-title">
                    <h3>{this.prop.manager.myIncome}</h3>
                    <p>{this.prop.manager.note}</p>
                </div>
                <div className="mynnc-content">
                    <div className="mynnc-text">
                        <strong>{this.prop.manager.unclaimed}</strong>
                        <strong className="mynnc-number">{mynnc === 0 ? '0' : this.props.manager.myNNCBalance}</strong>
                    </div>
                    <div className="mynnc-btn">
                        {
                            this.props.statemanager.getSaleNNCState && (
                                <Button
                                    type='ghost'
                                    inline={true}
                                    size="small"
                                    disabled={true}
                                >{this.prop.btn.claimnncing}</Button>
                            )
                        }
                        {
                            !this.props.statemanager.getSaleNNCState && (
                                <Button
                                    type={mynnc !== 0 ? 'primary' : 'ghost'}
                                    inline={true}
                                    size="small"
                                    disabled={mynnc === 0}
                                    onClick={this.toGetNNC}
                                >{this.prop.btn.claim}</Button>
                            )
                        }

                    </div>
                </div>
            </div>
        );
    }
}
export default injectIntl(ClaimNNC);