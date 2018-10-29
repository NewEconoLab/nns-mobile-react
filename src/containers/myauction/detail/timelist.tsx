/**
 * 时间轴模块
 */
import * as React from 'react';
import classnames from 'classnames';
import TitleText from '@/components/titletext';
import '../index.less'
import { IAuction, AuctionState } from '@/store/interface/auction.interface';
import { IAuctionDetailProps } from '../interface/index.interface';
import TimeDetail from './timenode';
import Process from './process';

export default class DomainDetail extends React.Component<IAuctionDetailProps>
{
    public ilog = (name:any) => {
        return (value:any) => {
            console.log(`${name}: ${value}`);
        };
    };
    // public state=[{
    //     defaultValue:[0,0]
    // }]

    public render()
    {
        const process = Process.getProcess(this.props.myauction.detail as IAuction,5*60*1000);
        const wrapperClassNames = classnames('timeline-wrapper', {'active-over': this.props.myauction.detail ? this.props.myauction.detail.auctionState === AuctionState.end : false});
        return (
            <div className="timelist-wrapper">
                <TitleText text="时间轴"/>
                <p className="time-tip">注意：确定期为竞拍第一阶段，时长为3天，此期间所有的出价都有效。当确定期最后一天有人出价时将触发最大时长为2天的随机期。否则竞拍即在确定期结束。</p>
                <div className={wrapperClassNames}>
                    <div className="time-line" style={{width:process.width+'%'}}/>
                    {
                        process.timearr.map((value,key)=>
                        {
                            return <TimeDetail key={key} dian={key===process.timearr.length-1} index={key} time={value.time} active={value.active} />
                        })
                    }
                </div>
            </div>
        );
    }
}
