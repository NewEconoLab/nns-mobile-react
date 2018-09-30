/**
 * 域名管理列表
 */
import * as React from 'react';
import {IManagerListProps} from './interface/index.interface';
import {Link} from 'react-router-dom';
// import DateTool from '@/tools/datetool';
import './index.less'

export default class ManagerList extends React.Component<IManagerListProps, any>
{
  // public formatDate = (time:string)=>{    
  //   const ttl:string = DateTool.getTime(this.props.item.ttl);
  //   return ttl;
  // }
  public render()
  {
    return (
      <React.Fragment>
        <div className="">
          <Link to={'/manager/detail/' + this.props.item.domain}>
            <div className="list-wrapper">
              <div className="manager-name">{this.props.item.domain}</div>
              <div className="manager-normal">地址解析器：<br/>{this.props.item.resolver}</div>
              <div className="manager-normal">地址映射：<br/>{this.props.item.resolverAddr}</div>
              <div className="manager-normal">到期时间：{this.props.item.ttl} <span className="text-orange">（即将过期）</span><span className="text-red">（已过期）</span> </div>
            </div>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}
