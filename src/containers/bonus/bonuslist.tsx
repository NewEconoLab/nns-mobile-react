/**
 * 分红列表
 */
import * as React from 'react';
import './index.less'
import { injectIntl } from 'react-intl';
import { IBonusListProps } from './interface/index.interface';
import * as formatTime from 'utils/formatTime';

class BonusList extends React.Component<IBonusListProps,any>
{
  public prop = this.props.intl.messages;
  public render()
  {
    return (
      <React.Fragment>
          <div className="list-wrapper">
            <div className="bonus-me text-green">+ {this.props.item.send} CGAS</div>
            <div className="bonus-time">{this.prop.bonus.blocktime}{formatTime.format('yyyy/MM/dd hh:mm:ss', this.props.item.blocktime, this.props.intl.locale)}</div>
          </div>
      </React.Fragment>
    );
  }
}
export default injectIntl(BonusList);