/**
 * 域名管理
 */
import * as React from 'react';
import TitleText from '@/components/titletext';
import ManagerList from './managerlist'
import {IManagerList,IManagerProps} from './interface/index.interface';
import {observer,inject} from 'mobx-react'
import './index.less'

// 接口"getdomainbyaddress", 参数："ATBTRWX8v8teMHCvPXovir3Hy92RPnwdEi",".neo"
@inject('manager', 'common')
@observer
export default class Manager extends React.Component<IManagerProps,any>
{
  public componentDidMount(){
    this.props.manager.getdomainbyaddress(this.props.common.address);
  }
  public render()
  {
    return (
      <div className="manager-wrap">
        <TitleText text="我的域名" />
        <div className="manager-list">
          {
            this.props.manager.domainList.map((item:IManagerList, index:number) => {
              return <ManagerList item={item} key={index} {...this.props}/>;
            })
          }
        </div>
        {/* <div className="domainset-wrap">
          <DomainMap />
        </div> */}
      </div>
    );
  }
}
