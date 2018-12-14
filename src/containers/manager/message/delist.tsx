import * as React from 'react';
import { observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
// import { IManagerListProps } from './interface/index.interface';
// import * as formatTime from 'utils/formatTime';
import '../index.less'
// import DomainSelling from '@/store/DomainSelling';
// import { Button } from 'antd-mobile';
import Message from '@/components/message';
import { IManagerStore } from '../interface/index.interface';
interface IDelistDomainProps {
    intl: any,
    domain: string,
    manager: IManagerStore,
    showDelist: boolean,
    onClose: () => void
}

@observer
class DelistDomain extends React.Component<IDelistDomainProps, any>
{
    public prop = this.props.intl.messages;
    // 域名转让弹筐--关闭
    public onCloseDelist = () => {
        this.setState({
            checkAgain: 0
        }, () => {
            this.props.onClose();
        })
    }
    // 域名转让地址的输入 --todo
    public changeDelistAddress = (value: string) => {
        console.log(value);

    }
    // 域名转让发送交易
    public toDelistOwner = () => {
        console.log("send transfer");
        this.onCloseDelist();
    }
    public render() {
        return (
            <React.Fragment>
                {
                    (this.props.showDelist) && (
                        <Message
                            title="域名下架"
                            onClose={this.onCloseDelist}
                            onConfirm={this.toDelistOwner}
                        >
                            <div className="message-checkagain-box">
                                <span>
                                    您确定要将 " {this.props.domain} "下架吗？
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