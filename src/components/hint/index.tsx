// 图标提示隐藏显示组件
import * as React from 'react';
import q1 from '@/img/q1.png'
// import q2 from '@/img/q2.png'
import './index.less';
export default class Header extends React.Component
{
    public render()
    {
        return (
            <div className="hint-box">
                <div className="hint-msg">
                    <div className="hint-img">
                        <img src={q1} alt="" />
                        {/* <img src={q2} alt="" />                               */}
                    </div>
                    <div className="hint-content">  
                        <p>确定期为竞拍第一阶段，时长为3天，此期间所有的出价都有效。当确定期最后一天有人出价时将触发最大时长为2天的随机期。否则竞拍即在确定期结束。</p>
                        <p>随机期为竞拍第二阶段，最大时长为2天，此期间任意一个出价都有可能触发该域名竞拍的结束从而出价无效，越靠后的出价触发结束的可能性越大，因此请尽早出价以免错失该域名。</p>
                    </div>
                </div>
            </div>
        );
    }
}

