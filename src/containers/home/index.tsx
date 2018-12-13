/**
 * nns主页布局
 */
import * as React from 'react';
import Action from '@/containers/home/action';
import Account from '@/containers/home/account';
import Auction from '@/containers/home/auction';
// import BuyDomain from '@/containers/home/buydomain';
import { IHomeProps } from '@/containers/home/interface/home.interface';
import './index.less'

import { observer, inject } from 'mobx-react';

@inject('home', 'common')
@observer
class NNS extends React.Component<IHomeProps, any> {
  // public componentDidMount() {
  //   Alert('操作失败', '操作失败，请稍后再试', '确定', () => {alert(1)}, 'error')
  // }
  public render() {
    return (
      <div className="nns-page">
        <Action {...this.props} />
        <Account {...this.props} />
        <Auction {...this.props} />
        {/* {
          this.props.home.xx && (
            <BuyDomain {...this.props} />
          )
        } */}
      </div>
    );
  }
}

export default NNS;
