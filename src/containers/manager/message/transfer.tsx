import * as React from 'react';
import { observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
// import { IManagerListProps } from './interface/index.interface';
// import * as formatTime from 'utils/formatTime';
import * as VerifyAddress from 'utils/verifyAddress';
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
        isOkTransfer: true, // 转让按钮确认，false为可点击，true为不可点击
    }
    public prop = this.props.intl.messages;


    // 域名转让弹筐--关闭
    public onCloseTransfer = () => {
        this.setState({
            inputAddress: '',
            checkAgain: 0,
            isOkTransfer: true,
        }, () => {
            this.props.onClose();
        })
    }
    // 域名转让地址的输入 --todo
    public changeTransferAddress = (value: string) => {
        console.log(value);
        this.setState({
            inputAddress:value
        })
        // 输入域名
        if (/^(.+\.)(test|TEST|neo|NEO[a-z][a-z])$/.test(value))
        {
            return this.getDomainAddress(value.toLowerCase());            
        }
        else // 输入地址
        {
            if(/^[a-zA-Z0-9]{34,34}$/.test(value)){
               const res = VerifyAddress.verifyAddress(value);
               if(res){
                    this.setState({
                        isOkTransfer:false
                    })
                    return true
                }else{
                    this.setState({
                        isOkTransfer:true
                    })
                    return false
                }
            }
        }
        return true
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
    
    /**
     * 获取域名映射的地址
     * @param domainName 域名
     */
    public getDomainAddress = async (domainName: string) =>
    {
        await this.props.manager.getResolveAddress(domainName);
        if(this.props.manager.domainAddress){
            this.setState({
                isOkTransfer:false
            })
            return true
        }else{
            this.setState({
                isOkTransfer:true
            })
            return false
        }
    }

    public render() {
        return (
            <React.Fragment>
                {
                    (this.state.checkAgain === 0 && this.props.showTransfer) && (
                        <Message
                            title={this.prop.manager.domaintransfer}
                            onClose={this.onCloseTransfer}
                            onConfirm={this.toCheckAgain}
                        >
                            <div className="message-domainname-box">
                                <div className="content-title">{this.prop.manager.domainname}</div>
                                <div className="domain-name">{this.props.domain}</div>
                                <div className="content-title2">{this.prop.manager.transferto}</div>
                                <Input
                                    type="text"
                                    placeholder={this.prop.manager.transferplaceholder}
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
                            title={this.prop.manager.domaintransfer}
                            onClose={this.onCloseTransfer}
                            onConfirm={this.toTransferOwner}
                        >
                            <div className="message-checkagain-box">
                                <span>
                                    {this.prop.manager.transfercheck1}" {this.props.domain} " {this.prop.manager.transfercheck2} " AKtKhWqRGvwwUiix6UhssVaqHTonxwpx6s "{this.prop.manager.transfercheck3}
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