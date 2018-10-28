// 弹筐组件
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd-mobile';
import './index.less';

interface Iprops {
    onConfirm: () => void,
    btnText: string,
    message: string,
    title: string,
    type?: string,
}

export default (title: string, message: string, btnText: string, onConfirm: () => void, type?:string) => {
    type = type ? type : 'success';
    // 释放组件
    const disposeNode = () => {
        ReactDOM.unmountComponentAtNode(div);
        if (div.parentNode) {
            div.parentNode.removeChild(div);
        }
    };

    // 插入message提示的容器至body
    const div = document.createElement('div');
    document.body.appendChild(div);


    class Alert extends React.Component<Iprops>
    {
        public onClose = () => {
            disposeNode();
        }
        public onConfirm = () => {
            if (this.props.onConfirm) {
                this.props.onConfirm();
                disposeNode();
            }
        }
        public render() {
            return (
                <div className="comp-alert-container">
                    <div className="mask" onClick={this.onClose} />
                    <div className="alert-wrapper">
                        {
                            type === 'success' && <img src={require('@/img/right2.png')} className="alert-success-icon" />
                        }
                        {
                            type === 'error' &&  <img src={require('@/img/wrong2.png')} className="alert-success-icon" />
                        }
                        <div className="alert-title" dangerouslySetInnerHTML={{ '__html': this.props.title }} />
                        <div className="alert-content" dangerouslySetInnerHTML={{ '__html': this.props.message }} />
                        <div className="alert-button-group">
                            <Button
                                type="primary"
                                onClick={this.onConfirm}
                            >{this.props.btnText}</Button>
                        </div>
                    </div>
                </div>
            );
        }
    }

    // message
    const node = (
        <Alert title={title} message={message} btnText={btnText} onConfirm={onConfirm} />
    );

    // 渲染message
    ReactDOM.render(node, div);
}