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
import Input from '@/components/Input/Input';
import { IManagerStore } from '../interface/index.interface';
import { nnstools } from '@/utils/nnstools';
interface ISaleDomainProps
{
    intl: any,
    domain: string,
    manager: IManagerStore,
    showSale: boolean,
    statemanager: IStatemanagerStore,
    onClose: () => void
}

@observer
class SaleDomain extends React.Component<ISaleDomainProps, any>
{
    public state = {
        salePrice: '', // 出售价格
        checkAgain: 0, // 再次确认,0为第一次确认，1为第二次确认，2为确认完毕
        isCanSale: true // 按钮是不可出售，false为可点击，true为不可点击
    }
    public prop = this.props.intl.messages;


    // 域名出售弹筐--关闭
    public onCloseSale = () =>
    {
        this.setState({
            salePrice: '',
            checkAgain: 0,
            isCanSale: true
        }, () =>
            {
                this.props.onClose();
            })
    }
    // 域名出售金额的输入 --todo
    public changeSellingPrice = (value: string) =>
    {
        this.setState({
            salePrice: value
        })
        if (/\./.test(value) && value.split('.')[1].length >= 2)
        {
            this.setState({
                isCanSale: true
            })
            return false;
        }
        if (parseFloat(value) <= 0 || value === '')
        {
            this.setState({
                isCanSale: true
            })
            return false
        }
        this.setState({
            isCanSale: false
        })
        return true
    }
    // 域名出售发送交易--todo
    public toSellDomain = async () =>
    {
        this.props.statemanager.sellDomainState.push(this.props.domain);
        const res = await nnstools.saleDomain(this.props.domain, this.state.salePrice);
        if (res && res["txid"]!=='')
        {
            const txid = res["txid"];
            taskmanager.addTask(
                new Task(
                    TaskType.saleDomain,
                    ConfirmType.contract,
                    txid,
                    { domain: this.props.domain, price: this.state.salePrice }
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
            this.props.statemanager.sellDomainStateDel(this.props.domain);
        }
        this.onCloseSale();
    }
    // 再次确认
    public toCheckAgain = () =>
    {
        this.setState({
            checkAgain: 1
        })
    }

    public render()
    {
        return (
            <React.Fragment>
                {
                    (this.state.checkAgain === 0 && this.props.showSale) && (
                        <Message
                            title={this.prop.manager.selldomain}
                            onClose={this.onCloseSale}
                            onConfirm={this.toCheckAgain}
                            btnText={this.prop.btn.sell}
                            btnStatus={this.state.isCanSale}
                        >
                            <div className="message-domainname-box">
                                <div className="content-title">{this.prop.manager.domainname}</div>
                                <div className="domain-name">{this.props.domain}</div>
                                <div className="content-title">{this.prop.manager.setprice}</div>
                                <Input
                                    type="number"
                                    placeholder={this.prop.manager.sellplaceholder}
                                    value={this.state.salePrice}
                                    onChange={this.changeSellingPrice}
                                    style={{ width: '3.15rem' }}
                                />
                            </div>
                        </Message>
                    )
                }
                {
                    (this.state.checkAgain === 1 && this.props.showSale) && (
                        <Message
                            title={this.prop.manager.selldomain}
                            onClose={this.onCloseSale}
                            onConfirm={this.toSellDomain}
                        >
                            <div className="message-checkagain-box">
                                <span>
                                    {this.prop.manager.sellcheck1}" {this.props.domain} "{this.prop.manager.sellcheck2} " {this.state.salePrice} NNC " {this.prop.manager.sellcheck3}
                                </span>
                            </div>
                        </Message>
                    )
                }
            </React.Fragment>
        )
    }
}
export default injectIntl(SaleDomain)