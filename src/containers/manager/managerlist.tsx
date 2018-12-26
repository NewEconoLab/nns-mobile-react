/**
 * 域名管理列表
 */
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { IManagerListProps } from './interface/index.interface';
import * as formatTime from 'utils/formatTime';
import './index.less'
import DomainSelling from '@/store/DomainSelling';
import { Button } from 'antd-mobile';
// import Message from '@/components/message';
// import Input from '@/components/Input/Input';
import TransferDomain from './message/transfer';
import SaleDomain from './message/sale';
import DelistDomain from './message/delist';

class ManagerList extends React.Component<IManagerListProps, any>
{
  public state = {
    isShowTransfer: false, // 转让
    isShowSaleDomain: false, // 出售
    isShowDelist: false, // 下架
    isCanClickButton: false, // 控制全部按钮
  }
  public prop = this.props.intl.messages;

  // 校验是否添加提示
  public dateComputed = (time: string) =>
  {
    // 过期
    if (new Date().getTime() > formatTime.formatUnixTime(time))
    {
      return <span className="text-red">{this.prop.manager.msg2}</span>;
    }
    // 即将过期
    if (formatTime.formatUnixTime(time) - new Date().getTime() <= (DomainSelling.day * 60))
    {
      return <span className="text-orange">{this.prop.manager.msg}</span>;
    }
    return <span />;
  }
  // 校验是否可对域名编辑
  public isExpire = (time: string) =>
  {
    // 过期
    if (new Date().getTime() > formatTime.formatUnixTime(time))
    {
      return false;
    }
    return true
  }
  // 跳转到域名编辑功能
  public onGoToDetail = (domain: string) =>
  {
    this.props.manager.detail = this.props.item;
    this.props.history.push('/manager/detail/' + domain);
  }
  // 域名转让弹筐--打开
  public onOpenTransfer = () =>
  {
    this.setState({
      isShowTransfer: true
    });
  }
  // 域名转让弹筐--关闭
  public onCloseTransfer = () =>
  {
    this.setState({
      isShowTransfer: false
    });
  }
  // 域名出售弹筐--打开
  public onOpenSellDomain = () =>
  {
    this.setState({
      isShowSaleDomain: true
    });
  }
  // 域名出售弹筐--关闭
  public onCloseSellDomain = () =>
  {
    this.setState({
      isShowSaleDomain: false
    })
  }
  // 域名下架弹筐--打开
  public onOpenDelistDomain = () =>
  {
    this.setState({
      isShowDelist: true
    });
  }
  // 域名下架弹筐--关闭
  public onCloseDelistDomain = () =>
  {
    this.setState({
      isShowDelist: false
    })
  }

  public render()
  {
    const transfering = this.props.statemanager.transferDomainState.includes(this.props.item.domain);
    const selling = this.props.statemanager.sellDomainState.includes(this.props.item.domain);
    const delisting = this.props.statemanager.delistDomainState.includes(this.props.item.domain);
    const sellBtn = transfering||selling||!!this.props.item.resolverAddr;
    return (
      <React.Fragment>
        <div className="">
          <div className="list-wrapper">
            <div className="manager-name">{this.props.item.domain}</div>
            <div className="manager-normal">{this.prop.manager.resolver}：<br />{this.props.item.resolver ? this.props.item.resolver : this.prop.manager.noset}</div>
            {
              this.props.item.state !== '0901' && (
                <div className="manager-normal">{this.prop.manager.mapping}：<br />{this.props.item.resolverAddr ? this.props.item.resolverAddr : this.prop.manager.noset}</div>
              )
            }
            <div className="manager-normal">{this.prop.manager.expirationtime}：<br />{formatTime.format('yyyy/MM/dd hh:mm:ss', this.props.item.ttl, this.props.intl.locale)} {this.dateComputed(this.props.item.ttl)} </div>
            {
              this.props.item.state === '0901' && (
                <div className="manager-normal">出售价格：<br />{this.props.item.price ? this.props.item.price : '0'} NNC</div>
              )
            }
            {
              !!this.isExpire(this.props.item.ttl) && (
                <div className="manager-btn">
                  {
                    this.props.item.state !== '0901' && (
                      <div className="edit-btn">
                        <Button
                          type={(transfering||selling)?"ghost":"primary"}
                          inline={true}
                          size="small"
                          style={{ width: '105px' }}
                          disabled={transfering||selling}
                          onClick={this.onGoToDetail.bind(this, this.props.item.domain)}
                        >{this.prop.btn.edit}</Button>
                        {
                          transfering ?
                            <Button type="primary" inline={true} size="small" loading={true}>{this.prop.btn.transfering}</Button> :
                            <Button
                              type={(transfering||selling)?"ghost":"primary"}
                              inline={true}
                              size="small"
                              style={{ width: '105px' }}
                              onClick={this.onOpenTransfer}
                              disabled={transfering||selling}
                            >{this.prop.btn.transfer}</Button>
                        }
                        {
                          selling ?
                            <Button type="primary" inline={true} size="small" loading={true}>{this.prop.btn.selling}</Button> :
                            <Button
                              type={sellBtn ? "ghost":"primary"}
                              inline={true}
                              size="small"
                              style={{ width: '105px' }}
                              disabled={sellBtn}
                              onClick={this.onOpenSellDomain}
                            >{this.prop.btn.sell}</Button>
                        }
                      </div>
                    )
                  }
                  {
                    this.props.item.state === '0901' && (
                      <div className="delist-btn">
                        {
                          delisting ?
                            <Button type="primary" inline={true} size="small" loading={true}>{this.prop.btn.delisting}</Button> :
                            <Button
                              type="primary"
                              inline={true}
                              size="small"
                              style={{ width: '105px' }}
                              onClick={this.onOpenDelistDomain}
                            >{this.prop.btn.delist}</Button>
                        }
                      </div>
                    )
                  }
                </div>
              )
            }
          </div>
          {/* 转让功能 */}
          <TransferDomain
            domain={this.props.item.domain}
            {...this.props}
            showTransfer={this.state.isShowTransfer}
            onClose={this.onCloseTransfer} />
          {/* 出售功能 */}
          <SaleDomain
            domain={this.props.item.domain}
            {...this.props}
            showSale={this.state.isShowSaleDomain}
            onClose={this.onCloseSellDomain} />
          {/* 下架功能 */}
          <DelistDomain
            domain={this.props.item.domain}
            {...this.props}
            showDelist={this.state.isShowDelist}
            onClose={this.onCloseDelistDomain} />
        </div>
      </React.Fragment>
    )
  }
}


export default injectIntl(ManagerList);