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
import { injectIntl } from 'react-intl';

class DomainDetail extends React.Component<IAuctionDetailProps>
{
    public prop = this.props.intl.messages;

    public render()
    {
        const process = Process.getProcess(this.props.myauction.detail as IAuction,5*60*1000);
        const wrapperClassNames = classnames('timeline-wrapper', {'active-over': this.props.myauction.detail ? this.props.myauction.detail.auctionState === AuctionState.end : false});
        return (
            <div className="timelist-wrapper">
                <TitleText text={this.prop.myauction.info.title2}/>
                <p className="time-tip"> {process.timearr.length===4?this.prop.myauction.info.tips1:this.prop.myauction.info.tips2}</p>
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
export default injectIntl(DomainDetail);