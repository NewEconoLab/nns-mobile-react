/**
 * 绑定域名
 */
import * as React from 'react';
import TitleText from '@/components/titletext';
import { observer, inject } from 'mobx-react';
import { injectIntl } from 'react-intl';
import { Button } from 'antd-mobile';
// import Alert from '@/components/alert';
import './index.less'
import { IBindProps } from './interface/index.interface';
import classnames from 'classnames';

@inject('bind','common','statemanager')
@observer
class BindDomain extends React.Component<IBindProps, any>
{
  public prop = this.props.intl.messages;

  public componentDidMount(){
    this.props.bind.getBindDomain();
  }

  public toBindDomain = () => {
      console.log("tobind");
      this.props.history.push('/bindlist');
  }
  public render() {
    const bindClassName = classnames('has-bind', { 'no-bind': this.props.bind.bindDomain === '' })
    const binding = this.props.statemanager.bindDomainState.length===0&&this.props.statemanager.delBindDomainState.length===0;
    return (
      <div className="bind-wrap">
        <TitleText text={this.prop.bind.myaddress} />
        <div className="has-bind">{this.props.common.address}</div>
        <TitleText text={this.prop.bind.bindtitle}>       
          {
            binding?<Button type="primary" style={{ borderRadius: '3px' }} inline={true} size="small" onClick={this.toBindDomain}>{this.props.bind.bindDomain === ''?this.prop.btn.bind:this.prop.btn.replace}</Button>
            :<Button type="ghost" disabled={true} style={{ borderRadius: '3px' }} inline={true} size="small">{this.prop.btn.wait}</Button>
          }   
            
            {/* <Button type="primary" style={{ borderRadius: '3px' }} inline={true} size="small" onClick={this.toBindDomain}>修改</Button> */}
        </TitleText>
        <div className={bindClassName}>{this.props.bind.bindDomain === ''?this.prop.bind.unbindmsg:this.props.bind.bindDomain}</div> 
      </div>
    );
  }
}
export default injectIntl(BindDomain);