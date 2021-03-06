// 加价模块
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.less';
import close from '@/img/close.png';
import Input from '@/components/Input/Input';
import { Button } from 'antd-mobile';
import { IAuctionAddbidProps, IAuctionDetailProps } from "@/containers/myauction/interface/index.interface";
import { nnstools } from '@/utils/nnstools';
import DomainSelling from '@/store/DomainSelling';
import { IAuction, AuctionState } from '@/store/interface/auction.interface';
import { injectIntl } from 'react-intl'
import Alert from '@/components/alert';
import taskmanager from '@/store/taskmanager';
import { Task, ConfirmType, TaskType } from '@/store/interface/taskmanager.interface';
// import { accAdd } from '@/utils/alculator';
import { toNumFixed } from '@/utils/function';

interface Istate
{
    inputMessage: string,
    inputState: string,
    inputColor: string,
    btnWait: boolean,
}

// 获取竞拍状态：getauctionstate 参数：域名
@inject('common', 'myauction')
@observer

class Addbid extends React.Component<IAuctionAddbidProps & IAuctionDetailProps, Istate>{
    public state = {
        inputMessage: '',
        inputState: '',
        inputColor: '',
        btnWait: false
    }
    public prop = this.props.intl.messages;
    public componentDidMount()
    {
        const currentPrice = this.props.myauction.detail ? this.props.myauction.detail.addWho.totalValue : 0;
        this.setState({
            inputMessage: this.prop.myauction.info.msg2 + currentPrice + ' CGAS'
        })
    }
    public change = (value: string) =>
    {
        const state = {
            inputMessage: '',
            inputState: '',
            inputColor: ''
        }
        if (/\./.test(value) && value.split('.')[1].length >= 2)
        {
            return false;
        }
        const currentPrice = this.props.myauction.detail ? this.props.myauction.detail.addWho.totalValue : 0;
        const heightPrice = this.props.myauction.detail ? this.props.myauction.detail.maxPrice : 0;
        // const myBidPrice = value?(accAdd(value,currentPrice)):currentPrice;
        const myBidPrice = value ? parseFloat(value) + parseFloat(currentPrice.toString()) : currentPrice;
        state.inputMessage = this.prop.myauction.info.msg2 + myBidPrice + ' CGAS';
        state.inputColor = '';
        if (this.props.myauction.detail)
        {
            if (this.props.myauction.detail.auctionState === AuctionState.fixed)
            {
                const num = toNumFixed(currentPrice * 0.1, 1);
                if (parseFloat(value) < num)
                {
                    state.inputMessage = this.prop.myauction.info.errmsg3;
                    state.inputColor = 'red-color';
                    return false;
                }
            }
        }


        if (myBidPrice < heightPrice)
        {
            state.inputMessage = this.prop.myauction.info.errmsg2;
            state.inputColor = 'red-color';
        }

        if (parseFloat(value) > parseFloat(this.props.common.accountBalance))
        {
            state.inputMessage = this.prop.myauction.info.errmsg;
            state.inputColor = 'red-color';
        }

        this.props.myauction.myBid = value;

        this.setState(state)

        return true;
    }
    public addBid = async () =>
    {
        const auction = this.props.myauction.detail as IAuction;
        try
        {
            this.setState({ btnWait: true });
            const res = await nnstools.raise(auction.auctionId, this.props.myauction.myBid, DomainSelling.RootNeo.register);
            if (res['txid'] !== '') {
                taskmanager.addTask(new Task(TaskType.raise, ConfirmType.contract, res['txid'], { domain: auction["fulldomain"], amount: this.props.myauction.myBid }))
                Alert(this.prop.message.successmsg, this.prop.message.waitmsg, this.prop.btn.confirm, () =>
                {
                    return;
                });
            }
            else
            {
                Alert(this.prop.message.errmsg, this.prop.message.errmsgtip1, this.prop.btn.confirm, () =>
                {
                    return;
                }, 'error');
            }
            this.setState({ btnWait: false });
        } catch (error)
        {
            console.log(error);
            this.setState({ btnWait: false });
        }
        this.onClose();
    }

    public onClose = () =>
    {
        this.props.myauction.showDialog = false;
        const currentPrice = this.props.myauction.detail ? this.props.myauction.detail.addWho.totalValue : 0;
        this.setState({
            inputMessage: this.prop.myauction.info.msg2 + currentPrice + ' CGAS',
            inputState: '',
            inputColor: ''
        })
    }
    public render()
    {
        const isDisabled = !!this.state.inputColor || !!!this.props.myauction.myBid || parseFloat(this.props.myauction.myBid) === 0
        return (
            <div className="addbid-wrapper">
                <div className="addbid-box">
                    <div className="addbid-title">
                        <h2>{this.prop.myauction.info.title3}</h2>
                        <div className="close-addbid" onClick={this.onClose}>
                            <img src={close} alt="" />
                        </div>
                    </div>
                    <div className="addbid-content">
                        <div className="addbid-account">{this.prop.myauction.info.msg} {this.props.common.accountBalance} CGAS</div>
                        <div className="addbid-amount">
                            <span className="addbid-text">{this.prop.myauction.info.raisebid}</span>
                            <Input
                                placeholder=""
                                style={{ width: '2rem' }}
                                status={this.state.inputState}
                                message={this.state.inputMessage}
                                value={this.props.myauction.myBid}
                                onChange={this.change}
                                color={this.state.inputColor}
                                type="number"
                            />
                            <span className="addbid-text-abs">CGAS</span>
                        </div>
                    </div>
                    <div className="addbid-tips">
                        <span>{this.prop.myauction.info.tips3}</span>
                    </div>
                    {
                        this.state.btnWait
                            ? <Button type="primary" style={{ borderRadius: '0' }} className="detail-btn" loading={true}>{this.prop.btn.placebid}</Button>
                            : <Button type="primary" onClick={this.addBid} disabled={isDisabled} style={{ borderRadius: '0' }} className="detail-btn" >{this.prop.btn.placebid}</Button>
                    }
                </div>
            </div>

        )
    }
}


export default injectIntl(Addbid);