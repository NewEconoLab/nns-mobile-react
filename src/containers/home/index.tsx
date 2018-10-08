/**
 * nns主页布局
 */
import * as React from 'react';
import Action from '@/containers/home/action';
import Account from '@/containers/home/account';
import Auction from '@/containers/home/auction';
import { IHomeProps } from '@/containers/home/interface/home.interface';
import './index.less'

import { observer, inject } from 'mobx-react';

@inject('home', 'common')
@observer
class NNS extends React.Component<IHomeProps, any> {
  public render() {
    return (
      <div className="nns-page">
        <Action {...this.props} />
        <Account {...this.props} />
        <Auction {...this.props} />
      </div>
    );
  }
}

export default NNS;
