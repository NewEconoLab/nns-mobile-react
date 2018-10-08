/**
 * 域名管理列表
 */
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { IManagerListProps } from './interface/index.interface';
import * as formatTime from 'utils/formatTime';
import './index.less'

// 获取解析地址 getresolvedaddress 参数：域名

class ManagerList extends React.Component<IManagerListProps>
{
  public dateComputed = (time:string) => {
    if(new Date().getTime() > formatTime.formatUnixTime(time)) {
      return <span className="text-red">（已过期）</span>;
    }

    if(formatTime.formatUnixTime(time) - new Date().getTime() <= (86400000 * 60)) {
      return <span className="text-orange">（即将过期）</span>;
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
              <div className="manager-normal">地址解析器：<br />{this.props.item.resolver ? this.props.item.resolver : '未设置'}</div>
              <div className="manager-normal">地址映射：<br />{this.props.item.resolverAddr ? this.props.item.resolverAddr : '未设置'}</div>
              <div className="manager-normal">到期时间：{formatTime.format('yyyy/MM/dd hh:mm:ss', this.props.item.ttl, this.props.intl.locale)} {this.dateComputed(this.props.item.ttl)} </div>
            </div>
        </div>
      </React.Fragment>
    );
  }
}


export default injectIntl(ManagerList);