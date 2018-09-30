
/**
 * nns主页下竞拍账户模块
 */
import * as React from 'react';
import { Button } from 'antd-mobile';
import './index.less'
import TitleText from '@/components/titletext';
// 引入数据类型
import {IHomeProps} from '@/containers/home/interface/home.interface';
import common from '@/store/common'
import {injectIntl} from 'react-intl'

class Account extends React.Component<IHomeProps,any>
{
  // 定义语言切换常量
  public prop = this.props.intl.messages;
  
  public onWithdrawClick = ()=>{
    this.props.history.push('/withdraw');   
  }
  public onTopupClick = ()=>{
    this.props.history.push('/topup');   
  }
  public render()
  {
    return (
      <div className="account-wrap box-wrap">
        <TitleText text={this.prop.home.account.title}>
          <div className="button-group">
            <Button type="ghost" inline={true} size="small" style={{ marginRight: '15px' }} onClick={this.onWithdrawClick}>{this.prop.btn.withdraw}</Button>
            <Button type="primary" inline={true} size="small" onClick={this.onTopupClick}>{this.prop.btn.topup}</Button>
          </div>
        </TitleText>
        <div className="account-msg">CGAS {common.accountBalance}</div>
      </div>
    );
  }
}
export default injectIntl(Account);