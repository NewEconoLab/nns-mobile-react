/**
 * 域名管理列表
 */
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { IManagerListProps } from './interface/index.interface';
import * as formatTime from 'utils/formatTime';
import './index.less'
import DomainSelling from '@/store/DomainSelling';

// 获取解析地址 getresolvedaddress 参数：域名

class ManagerList extends React.Component<IManagerListProps>
{
  public prop = this.props.intl.messages;
  public dateComputed = (time:string) => {
    if(new Date().getTime() > formatTime.formatUnixTime(time)) {
      return <span className="text-red">{this.prop.manager.msg2}</span>;
    }

    if(formatTime.formatUnixTime(time) - new Date().getTime() <= (DomainSelling.day* 60)) {
      return <span className="text-orange">{this.prop.manager.msg}</span>;
    }

    return <span/>;
  }

  public onGoToDetail = (domain:string) => {
    this.props.manager.detail = this.props.item;
    this.props.history.push('/manager/detail/' + domain);
  }
  public render() {
    return (
      <React.Fragment>
        <div className="">
            <div className="list-wrapper" onClick={this.onGoToDetail.bind(this, this.props.item.domain)}>
              <div className="manager-name">{this.props.item.domain}</div>
              <div className="manager-normal">{this.prop.manager.resolver}：<br />{this.props.item.resolver ? this.props.item.resolver : this.prop.manager.noset}</div>
              <div className="manager-normal">{this.prop.manager.mapping}：<br />{this.props.item.resolverAddr ? this.props.item.resolverAddr : this.prop.manager.noset}</div>
              <div className="manager-normal">{this.prop.manager.expirationtime}：<br />{formatTime.format('yyyy/MM/dd hh:mm:ss', this.props.item.ttl, this.props.intl.locale)} {this.dateComputed(this.props.item.ttl)} </div>
            </div>
        </div>
      </React.Fragment>
    )
  }
}


export default injectIntl(ManagerList);