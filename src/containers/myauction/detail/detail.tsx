/**
 * 域名详情子模块
 */
import * as React from 'react';
import TitleText from '@/components/titletext';
import Hint from '@/components/hint';
// import q1 from '@/img/q1.png'
// import q2 from '@/img/q2.png'
import '../index.less'
export default class Detail extends React.Component
{

    public render()
    {
        return (
            <React.Fragment>
                <div className="domain-detail">
                    <TitleText text="域名信息">
                        <div className="status-group">
                            <div>
                                <span>状态：</span>
                                <span className="status-being">确定期</span>
                                <Hint />
                            </div>
                            {/* <div>
                                <span>状态：</span>
                                <span className="status-random">确定期</span>
                                
                            </div>
                            <div>
                                <span>状态：</span>
                                <span className="status-end">已结束</span>
                            </div> */}
                        </div>
                    </TitleText>
                    <div className="detail-content">
                        <div className="auction-name">balabala123.neo</div>
                        <div className="auction-normal">当前最高价：10 CGAS</div>
                        <div className="auction-normal">出价者：<span className="auction-me">他人（ ASH4...D9wk ）</span></div>
                        <div className="auction-normal">开标时间：2018/08/14 10:20:20</div>
                        <div className="auction-normal">我的出价总和：<span className="text-red">7</span> CGAS</div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
