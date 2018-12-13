// 加价模块
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import close from '@/img/close.png';
import { Button } from 'antd-mobile';
// import { nnstools } from '@/utils/nnstools';
// import DomainSelling from '@/store/DomainSelling';
import { injectIntl } from 'react-intl'
// import Alert from '@/components/alert';
// import taskmanager from '@/store/taskmanager';
// import { Task, ConfirmType, TaskType } from '@/store/interface/taskmanager.interface';
import { IHomeProps } from './interface/home.interface';
import * as formatTime from 'utils/formatTime';

// 获取竞拍状态：getauctionstate 参数：域名
@inject('common', 'home')
@observer

class BuyDomain extends React.Component<IHomeProps>{    
    public prop = this.props.intl.messages;
    
    public onBuyDomain = async () => {
        
        this.onClose();
    }

    public onClose = () => {
        console.log("close buy")
    }
    public render() {   
        const time = this.props.home.sellingDomain? this.props.home.sellingDomain.ttl:0;
        return (
            <div className="saledomain-wrapper">
                <div className="saledomain-box">
                    <div className="saledomain-title">
                        <h2>域名详情</h2>
                        <div className="close-saledomain" onClick={this.onClose}>
                            <img src={close} alt="" />
                        </div>
                    </div>
                    <div className="saledomain-content">
                        <div className="saledomain-text">
                            域名：{this.props.home.sellingDomain&& this.props.home.sellingDomain.domain}
                        </div>
                        <div className="saledomain-text">
                            域名到期时间：{formatTime.format('yyyy/MM/dd hh:mm:ss', time.toString(), this.props.intl.locale)}
                        </div>
                        <div className="saledomain-text">
                            出售价格：{this.props.home.sellingDomain&& this.props.home.sellingDomain.price} NNC
                        </div>
                    </div>                    
                    <Button type="primary" style={{ borderRadius: '0' }} className="detail-btn">下架</Button>
                    {/* <Button type="primary" style={{ borderRadius: '0' }} className="detail-btn" loading={true}>购买</Button>
                    <Button type="primary" onClick={this.onBuyDomain} disabled={ this.props.home.isOKSale} style={{ borderRadius: '0' }} className="detail-btn" >购买</Button> */}
                </div>
            </div>
        )
    }
}


export default injectIntl(BuyDomain);