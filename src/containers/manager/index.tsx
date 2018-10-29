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
import { injectIntl } from 'react-intl';

// 接口"getdomainbyaddress", 参数："ATBTRWX8v8teMHCvPXovir3Hy92RPnwdEi",".neo"
@inject('manager', 'common')
@observer
class Manager extends React.Component<IManagerProps, any>
{
  public prop = this.props.intl.messages;
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
              <p>{this.prop.message.empty}</p>
            </div>
          </div>
        }
        {
          this.props.manager.domainList.length !== 0 &&
          <React.Fragment>
            <TitleText text={this.prop.manager.title}/>
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
export default injectIntl(Manager);