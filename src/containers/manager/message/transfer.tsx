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
interface ITransferDomainProps {
    intl: any,
    domain: string,
    manager: IManagerStore,
    showTransfer: boolean,
    onClose: () => void
}

@observer
class TransferDomain extends React.Component<ITransferDomainProps, any>
{
    public state = {
        inputAddress: '', // 转让的地址
        checkAgain: 0, // 再次确认,0为第一次确认，1为第二次确认，2为确认完毕
        isOkTransfer: true, // 转让按钮确认，true为不可点击，false为可点击
    }
    public prop = this.props.intl.messages;


    // 域名转让弹筐--关闭
    public onCloseTransfer = () => {
        this.setState({
            checkAgain: 0
        }, () => {
            this.props.onClose();
        })
    }
    // 域名转让地址的输入 --todo
    public changeTransferAddress = (value: string) => {
        console.log(value);

    }
    // 域名转让发送交易
    public toTransferOwner = () => {
        console.log("send transfer");
        this.onCloseTransfer();
    }
    public toCheckAgain = () => {
        this.setState({
            checkAgain: 1
        })
    }
    public render() {
        return (
            <React.Fragment>
                {
                    (this.state.checkAgain === 0 && this.props.showTransfer) && (
                        <Message
                            title="转让域名"
                            onClose={this.onCloseTransfer}
                            onConfirm={this.toCheckAgain}
                        >
                            <div className="message-domainname-box">
                                <div className="content-title">域名</div>
                                <div className="domain-name">{this.props.domain}</div>
                                <div className="content-title2">转让至</div>
                                <Input
                                    type="text"
                                    placeholder=""
                                    value={this.state.inputAddress}
                                    onChange={this.changeTransferAddress}
                                    style={{ width: '3.15rem' }}
                                />
                            </div>
                        </Message>
                    )
                }
                {
                    (this.state.checkAgain === 1 && this.props.showTransfer) && (
                        <Message
                            title="转让域名"
                            onClose={this.onCloseTransfer}
                            onConfirm={this.toTransferOwner}
                        >
                            <div className="message-checkagain-box">
                                <span>
                                    您确定要将 " {this.props.domain} " 转让给 " AKtKhWqRGvwwUiix6UhssVaqHTonxwpx6s " 吗？
                                </span>
                            </div>
                        </Message>
                    )
                }
            </React.Fragment>
        )
    }
}
export default injectIntl(TransferDomain)