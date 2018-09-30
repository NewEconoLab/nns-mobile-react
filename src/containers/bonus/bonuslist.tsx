/**
 * 分红列表
 */
import * as React from 'react';
import './index.less'
import { IBonusListProps } from './interface/index.interface';

export default class BonusList extends React.Component<IBonusListProps,any>
{
  public render()
  {
    return (
      <React.Fragment>
          <div className="list-wrapper">
            <div className="bonus-me">我的分红：<span className="text-green">{this.props.item.addrBonus}</span></div>
            <div className="bonus-normal">奖金池快照：{this.props.item.totalValue} CGAS</div>
            <div className="bonus-normal">我的NNC总量：{this.props.item.balance} NNC</div>
            <div className="bonus-normal">快照时间：{this.props.item.blocktime}</div>
          </div>
      </React.Fragment>
    );
  }
}
