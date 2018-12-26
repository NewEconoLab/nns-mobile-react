import * as React from 'react';
import { observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import '../index.less'
// import DomainSelling from '@/store/DomainSelling';
import Alert from '@/components/alert';
import { Task, ConfirmType, TaskType } from '@/store/interface/taskmanager.interface'; 
import taskmanager from '@/store/taskmanager';
import { IStatemanagerStore } from '@/store/interface/statemanager.interface';
import Message from '@/components/message';
import { IManagerStore } from '../interface/index.interface';
import { nnstools } from '@/utils/nnstools';
interface IDelistDomainProps {
    intl: any,
    domain: string,
    manager: IManagerStore,
    statemanager:IStatemanagerStore,
    showDelist: boolean,
    onClose: () => void
}

@observer
class DelistDomain extends React.Component<IDelistDomainProps, any>
{
    public prop = this.props.intl.messages;
    // 域名下架弹筐--关闭
    public onCloseDelist = () => {
        this.props.onClose();
    }
    // 域名转让发送交易
    public toDelistDomain = async() => {
        this.props.statemanager.delistDomainState.push(this.props.domain);
        const res = await nnstools.unSaleDomain(this.props.domain);
        if (res && res["txid"]){
            const txid = res["txid"];            
            taskmanager.addTask(
                new Task(
                    TaskType.unSaleDomain, 
                    ConfirmType.contract, 
                    txid, 
                    { domain: this.props.domain }
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
			}, 'error');
          this.props.statemanager.delistDomainStateDel(this.props.domain);
        }
        this.onCloseDelist();
    }
    public render() {
        return (
            <React.Fragment>
                {
                    (this.props.showDelist) && (
                        <Message
                            title={this.prop.manager.delistdomain}
                            onClose={this.onCloseDelist}
                            onConfirm={this.toDelistDomain}
                        >
                            <div className="message-checkagain-box">
                                <span>
                                    {this.prop.manager.delistcheck1} " {this.props.domain} "{this.prop.manager.delistcheck2}
                                </span>
                            </div>
                        </Message>
                    )
                }
            </React.Fragment>
        )
    }
}
export default injectIntl(DelistDomain)