// 弹筐组件
import * as React from 'react';
import './index.less';

export default class Alert extends React.Component<any, any>
{
    public render()
    {
        return (
            <div className="alert-wrapper">
                <div className="alert-box">
                    <div className="alert-content">
                        {/* 存放内容 */}
                        {this.props.children}
                    </div>
                </div>
                
            </div>
        );
    }
}