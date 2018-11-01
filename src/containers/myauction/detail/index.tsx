/**
 * 我的竞拍域名详情页
 */
import * as React from 'react';
import {injectIntl} from 'react-intl';
import {inject, observer} from 'mobx-react';
import Detail from './detail'
import TimeList from './timelist'
import Addbid from './addbid'
import { Button } from 'antd-mobile';
import {IAuctionDetailProps} from '../interface/index.interface';
import '../index.less'
import { IAuction, AuctionState } from '@/store/interface/auction.interface';
import common from '@/store/common';
import { nnstools } from '@/utils/nnstools';
import DomainSelling from '@/store/DomainSelling';
import taskmanager from '@/store/taskmanager';
import { Task, ConfirmType, TaskType } from '@/store/interface/taskmanager.interface';
import {IDetailState} from '../interface/detail.interface';
import Alert from '@/components/alert';

@inject('myauction', 'common')
@observer
class DomainDetail extends React.Component<IAuctionDetailProps, IDetailState>
{   
    public state = {
        loadingGetDomain: false,
        loadingGetBackCgas: false
    }
    public prop = this.props.intl.messages;
    public detail = this.props.myauction.detail as IAuction;

	public componentDidMount() {
		if (!this.props.myauction.detail) {
			this.props.history.goBack();
		}
	}
    public onShowDialog = () => {
        this.props.myauction.showDialog = true;
        this.props.myauction.myBid = '';
    }
    
    /**
     * 退回竞拍金
     */
    public bidSettlement = async ()=>
    {
        this.setState({
            loadingGetBackCgas:true
        })
        try {
            const data = await nnstools.bidSettlement(this.detail.auctionId,DomainSelling.RootNeo.register);
            const res = await common.sendrawtransaction(data.toHexString());
            if (res[ "txid" ])
            {
                const txid = res[ "txid" ];
                taskmanager.addTask(
                    new Task(TaskType.recoverCgas,ConfirmType.tranfer, txid, { domain: this.detail.fulldomain, amount: this.detail.addWho.totalValue })
                );
                Alert(this.prop.message.successmsg, this.prop.message.waitmsg, this.prop.btn.confirm, ()=>{ 
                    return;
                });
            }
            else
            {                
                Alert(this.prop.message.errmsg, this.prop.message.errmsgtip1, this.prop.btn.confirm, () => {
                    return;
                });
            }
        } catch (error) {
            console.error(error);            
        }
        this.setState({
            loadingGetBackCgas:false
        })
    }

    public getDomain = async () =>
    {        
        this.setState({
            loadingGetDomain: true
        })
        if(this.detail.addWho.accountTime && this.detail.addWho.accountTime.blockindex > 0)
        {
            try {
                const data:Uint8Array = await nnstools.collectDomain(this.detail.auctionId,DomainSelling.RootNeo.register);
                const res = await common.sendrawtransaction(data.toHexString());
                if (res[ "txid" ])
                {
                    const txid = res[ "txid" ];
                    taskmanager.addTask(
                        new Task(TaskType.collectDomain,ConfirmType.contract, txid, { domain: this.detail.fulldomain, amount: this.detail.addWho.totalValue })
                    );
                    
                    Alert(this.prop.message.successmsg, this.prop.message.waitmsg, this.prop.btn.confirm, ()=>{ 
                        console.log("成功了");                        
                    });
                }
            } catch (error) {
                console.error(error)
                Alert(this.prop.message.successmsg, this.prop.message.waitmsg, this.prop.btn.confirm, ()=>
                {
                    console.log(error);                    
                })
            }
        }
        else
        {
            const data1 = await nnstools.bidSettlement(this.detail.auctionId,DomainSelling.RootNeo.register);
            const data2 = await nnstools.collectDomain(this.detail.auctionId,DomainSelling.RootNeo.register);
            try {
                const res = await common.rechargeAndTransfer(data1,data2);
                if (res[ "errCode" ]&& res["errCode"]==="0000")
                {
                    const txid = res[ "txid" ];
                    console.log("            txid:"+txid);
                    
                    taskmanager.addTask(
                        new Task(TaskType.collectDomain,ConfirmType.recharge, txid, { domain: this.detail.fulldomain, amount: this.detail.addWho.totalValue })
                    );
                    Alert(this.prop.message.successmsg, this.prop.message.waitmsg, this.prop.btn.confirm, ()=>{ 
                        return;
                    });      
                }
                else
                {
                    throw new Error("交易发送失败");                    
                }
            } catch (error) {
                console.error(error)
            }
        }

        this.setState({
            loadingGetDomain: false
        })
    }

    public render()
    {
		if (!this.props.myauction.detail) {
            return null;
        }
        else
        {
            const detail =(this.props.myauction.detail as IAuction);
            let btn;
            if(detail.auctionState===AuctionState.random||detail.auctionState===AuctionState.fixed)
            {
                btn = <Button type="primary"  onClick={this.onShowDialog} style={{borderRadius:'0'}} className="detail-btn">{this.prop.btn.placebid}</Button>
            }
            else if(detail.auctionState === AuctionState.end)
            {
                if(detail.maxBuyer===common.address)
                {
                    if(detail.addWho.getdomainTime)
                    {
                        btn = <Button type="primary" disabled={true} style={{borderRadius:'0'}} className="detail-btn">{this.prop.btn.claimed}</Button>
                    }
                    else
                    {                    
                        btn = <Button type="primary" loading={this.state.loadingGetDomain} onClick={this.getDomain} style={{borderRadius:'0'}} className="detail-btn">{this.state.loadingGetDomain?this.prop.btn.claiming:this.prop.btn.claimdomain}</Button>
                    }
                }
                else if(detail.addWho.accountTime)
                {
                    btn = <Button type="primary" disabled={true} style={{borderRadius:'0'}} className="detail-btn">{this.prop.btn.reclaimed}</Button>
                }
                else
                {
                    btn = <Button type="primary"  loading={this.state.loadingGetBackCgas} onClick={this.bidSettlement} style={{borderRadius:'0'}} className="detail-btn">{this.state.loadingGetBackCgas?this.prop.btn.reclaiming:this.prop.btn.reclaimcgas}</Button>
                }
            }
            return (
                <div className="domain-detail-wrapper">
                    <Detail {...this.props}/>
                    <TimeList {...this.props}/>   
                    <div className="detail-footer">
                        {
                            this.props.myauction.showDialog && <Addbid {...this.props} />
                        }
                        {btn}
                    </div>
                </div>
            );
        }
    }
    
}

export default injectIntl(DomainDetail)