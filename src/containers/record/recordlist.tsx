/**
 * 操作记录列表
 */
import * as React from 'react';
import direction from '@/img/direction2.png'
import './index.less'

export default class RecordList extends React.Component
{
  public render()
  {
    return (
      <React.Fragment>
          {/* 兑换CGAS */}
          <div className="list-wrapper">
            <div className="list-up">
                <div className="up-left">
                    <div className="btn-wrapper">兑换cgas</div>
                </div>
                <div className="up-right">
                    <div className="upright-down">
                        <span>20 GAS</span>
                        <img src={direction} alt=""/>
                        <span>20 CGAS</span>
                    </div>                    
                </div>
            </div>
            <div className="list-down">
                <span>TXID:&nbsp;&nbsp;<a href="#" className="text-green">0xb3...c501</a></span><span>Status:&nbsp;&nbsp;<span className="text-red">等待确认...( 20s )</span></span>
            </div>
          </div>
          {/* 开标 或 领取域名*/}
          <div className="list-wrapper">
            <div className="list-up">
                <div className="up-left">
                    <div className="btn-wrapper">开标</div>
                </div>
                <div className="up-right">
                    <div className="upright-down">
                        <a href="#" className="text-green">sldfjals.neo</a>
                    </div>                    
                </div>
            </div>
            <div className="list-down">
                <span>TXID:&nbsp;&nbsp;<a href="#" className="text-green">0xb3...c501</a></span><span>Status:&nbsp;&nbsp;<span className="text-red">等待确认...( 20s )</span></span>
            </div>
          </div>
          {/* 加价 或 领回CGAS 域名编辑*/}
          <div className="list-wrapper">
            <div className="list-up">
                <div className="up-left">
                    <div className="btn-wrapper">加价</div>
                </div>
                <div className="up-right">
                    <div className="upright-up"><a href="#" className="text-green">asdfasd.neo</a> </div>
                    <div className="upright-down">20 CGAS</div>
                    {/* <div className="upright-down">地址解析器：sdfasd...asdfasdf</div>
                    <div className="upright-down">地址映射：sdfasd...asdfasdf</div>
                    <div className="upright-down">续约至：2019/08/14 10:20:20</div> */}
                </div>
            </div>
            <div className="list-down">
                <span>TXID:&nbsp;&nbsp;<a href="#" className="text-green">0xb3...c501</a></span><span>Status:&nbsp;&nbsp;<span className="text-red">等待确认...( 20s )</span></span>
            </div>
          </div>
          {/* 充值 或 提取 */}
          <div className="list-wrapper">
            <div className="list-up">
                <div className="up-left">
                    <div className="btn-wrapper">领取域名</div>
                </div>
                <div className="up-right">
                    <div className="upright-down">
                        <span>0.1 CGAS</span>
                    </div>                    
                </div>
            </div>
            <div className="list-down">
                <span>TXID:&nbsp;&nbsp;<a href="#" className="text-green">0xb3...c501</a></span><span>Status:&nbsp;&nbsp;<span className="text-red">等待确认...( 20s )</span></span>
            </div>
          </div>
      </React.Fragment>
    );
  }
}
