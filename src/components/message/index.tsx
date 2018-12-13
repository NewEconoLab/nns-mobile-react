import * as React from 'react';
import { injectIntl } from 'react-intl';
import { Button } from 'antd-mobile';
import './index.less';
interface Iprops {
  intl: any,
  title: string,
  btnText?:string,
  onClose: () => void,
  onConfirm: () => void
}


class Message extends React.Component<Iprops> {
  public onClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  public onConfirm = () => {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }
  public render() {
    return (
      <div className="comp-message-container">
        <div className="mask" onClick={this.onClose} />
        <div className="message-wrapper">
          <header>
            <h3>{this.props.title}</h3>
            <div className="close" onClick={this.onClose} />
          </header>
          <div className="message-content">
            {this.props.children}
          </div>
          <div className="message-button-group">
            <Button
              type="primary"
              onClick={this.onConfirm}
            >{this.props.btnText?this.props.btnText:this.props.intl.messages.btn.confirm}</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(Message)