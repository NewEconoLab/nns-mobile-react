// 图标提示隐藏显示组件
import * as React from 'react';
import q1 from '@/img/q1.png';
import q2 from '@/img/q2.png';
import { injectIntl } from 'react-intl';
import './index.less';
interface IProps{
    type:string,
    intl:any
}
class Hint extends React.Component<IProps>
{
    public prop = this.props.intl.messages;
    public render()
    {
        return (
            <div className="hint-box">
                <div className="hint-msg">
                    <div className="hint-img">
                        {this.props.type === '1' && <img src={q1} alt="" />}
                        {this.props.type === '2' && <img src={q2} alt="" />}
                    </div>
                    <div className="hint-content">  
                        <p>{this.prop.myauction.tip1}</p>
                        <p>{this.prop.myauction.tip2}</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default injectIntl(Hint);
