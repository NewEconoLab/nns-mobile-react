/**
 * 兑换CGAS
 */
import * as React from 'react';
import { injectIntl } from 'react-intl';
interface IProps {
  type: string,
  intl: any
}
class Exchange extends React.Component<IProps>
{
  public prop = this.props.intl.messages;
  public render() {
    return (
      <div className="account-wrap box-wrap">
        <div className="nodata-page">
          <div className="nodata-wrap">
            <img src={require('@/img/nodata.png')} alt="" />
            <p>{this.prop.message.empty}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default injectIntl(Exchange);