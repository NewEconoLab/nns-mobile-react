/**
 * 时间轴模块
 */
import * as React from 'react';
import TitleText from '@/components/titletext';
import '../index.less'

export default class DomainDetail extends React.Component
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
        return (
            <div className="timelist-wrapper">
                <TitleText text="时间轴"/>
                <p className="time-tip">注意：确定期为竞拍第一阶段，时长为3天，此期间所有的出价都有效。当确定期最后一天有人出价时将触发最大时长为2天的随机期。否则竞拍即在确定期结束。</p>
                <div className="timeline-wrapper">
                    <div className="node-box">
                        <div className="cricle">
                            <div className="title">开标时间</div>
                            <div className="time">
                                <p>2018/08/14</p>
                                <p>10:20:20</p>
                            </div>
                        </div>
                    </div>
                    <div className="node-box">
                        <div className="cricle" />
                    </div>
                    <div className="node-box">
                        <div className="cricle" />
                    </div>
                    {/* <div className="node-box">
                        <div className="cricle">
                            <div className="title">开标时间</div>
                            <div className="time">
                                <p>2018/08/14</p>
                                <p>10:20:20</p>
                            </div>
                        </div>
                    </div>
                    <div className="node-box">
                        <div className="cricle" />
                    </div> */}
                    <div className="dian">
                        <div className="title">开标时间</div>
                            <div className="time">
                                <p>2018/08/14</p>
                                <p>10:20:20</p>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}
