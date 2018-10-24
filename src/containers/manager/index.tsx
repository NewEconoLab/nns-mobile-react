/**
 * 域名管理
 */
import * as React from 'react';
import TitleText from '@/components/titletext';
import ManagerList from './managerlist'
import { IManagerList, IManagerProps } from './interface/index.interface';
import { observer, inject } from 'mobx-react'
import './index.less'
import { ActivityIndicator } from 'antd-mobile';

// 接口"getdomainbyaddress", 参数："ATBTRWX8v8teMHCvPXovir3Hy92RPnwdEi",".neo"
@inject('manager', 'common')
@observer
export default class Manager extends React.Component<IManagerProps, any>
{
  public componentDidMount()
  {
    this.props.manager.getdomainbyaddress(this.props.common.address);
  }
  public render()
  {
    return (
      <div className="manager-wrap">
        {
          !!!this.props.manager.domainList &&
          <div className="nodata-page">
            <div className="nodata-wrap">
              <ActivityIndicator animating={true} />
            </div>
          </div>
        }
        {
          this.props.manager.domainList.length === 0 &&
          <div className="nodata-page">
            <div className="nodata-wrap">
              <img src={require('@/img/nodata.png')} alt="" />
              <p>这里是空的</p>
            </div>
          </div>
        }
        {
          this.props.manager.domainList.length !== 0 &&
          <React.Fragment>
            <TitleText text="我的域名" />
            <div className="manager-list">
              {
                this.props.manager.domainList.map((item: IManagerList, index: number) =>
                {
                  return <ManagerList item={item} key={index} {...this.props} />;
                })
              }
            </div>
          </React.Fragment>
        }

        {/* <div className="domainset-wrap">
          <DomainMap />
        </div> */}
      </div>
    );
  }
}
