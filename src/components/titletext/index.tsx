// 小标题组件
import * as React from 'react';
import './index.less';

interface Iprops {
  text:string
}
export default class TitleText extends React.Component<Iprops,any> {
  public render () {
    return (
      <div className="title-text-wrapper">
        <h3 className="box-title">{this.props.text}</h3>
        <div className="right">
          {this.props.children}
        </div>
      </div>
    )
  }
}