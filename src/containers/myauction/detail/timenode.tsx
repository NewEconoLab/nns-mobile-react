/**
 * 时间轴模块
 */
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { format } from '@/utils/formatTime';

interface Iprops {
    dian:boolean,
    index:number,
    time:number,
    active:boolean,
    intl:any,
  }
class TimeDetail extends React.Component<Iprops>
{
    public render()
    {
        const ytd = format('yyyy/MM/dd',this.props.time.toString(),this.props.intl.locale);
        const hms = format('hh:mm:ss',this.props.time.toString(),this.props.intl.locale);
        return(
            
            <div className={this.props.dian?"dian":"node-box"}>
            {/* <div className="node-box"> */}
                <div className={"cricle "+(this.props.active?"active":"")}>
                {
                    this.props.index===0?
                    <>
                    <div className="title">开标时间</div>
                        <div className="time">
                            <p>{ytd}</p>
                            <p>{hms}</p>
                        </div>
                    </>:
                    <></>
                }
                {
                    this.props.index===3?
                    <>
                    <div className="title">确定期</div>
                        <div className="time">
                            <p>{ytd}</p>
                            <p>{hms}</p>
                        </div>
                    </>:
                    <></>
                }
                {
                    this.props.index===5?
                    <>
                    <div className="title">随机期</div>
                        <div className="time">
                            <p>{ytd}</p>
                            <p>{hms}</p>
                        </div>
                    </>:
                    <></>
                }
                </div>
            </div>
        )
    }
}
export default injectIntl(TimeDetail);