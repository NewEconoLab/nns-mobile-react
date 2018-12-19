import * as React from 'react';
import { observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
// import { IManagerListProps } from './interface/index.interface';
// import * as formatTime from 'utils/formatTime';
import '../index.less'
// import DomainSelling from '@/store/DomainSelling';
// import { Button } from 'antd-mobile';
import Message from '@/components/message';
import Input from '@/components/Input/Input';
import { IManagerStore } from '../interface/index.interface';
interface ISaleDomainProps
{
    intl: any,
    domain: string,
    manager: IManagerStore,
    showSale: boolean,
    onClose: () => void
}

@observer
class SaleDomain extends React.Component<ISaleDomainProps, any>
{
    public state = {
        salePrice: '', // 出售价格
        checkAgain: 0 // 再次确认,0为第一次确认，1为第二次确认，2为确认完毕
    }
    public prop = this.props.intl.messages;


    // 域名转让弹筐--关闭
    public onCloseSale = () =>
    {
        this.setState({
            checkAgain: 0
        }, () =>
        {
            this.props.onClose();
        })
    }
    // 域名转让地址的输入 --todo
    public changeSellingPrice = (value: string) =>
    {
        console.log(value);

    }
    // 域名转让发送交易
    public toSellDomain = () =>
    {
        console.log("send transfer");
        this.onCloseSale();
    }
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
                        >
                            <div className="message-domainname-box">
                                <div className="content-title">{this.prop.manager.domainname}</div>
                                <div className="domain-name">{this.props.domain}</div>
                                <div className="content-title">{this.prop.manager.setprice}</div>
                                <Input
                                    type="number"
                                    placeholder=""
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