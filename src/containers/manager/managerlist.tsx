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

class ManagerList extends React.Component<IManagerListProps, any>
{
  public state = {
    isShowTransfer: false // 转让
  }
  public prop = this.props.intl.messages;

  // 校验是否添加提示
  public dateComputed = (time: string) => {
    // 过期
    if (new Date().getTime() > formatTime.formatUnixTime(time)) {
      return <span className="text-red">{this.prop.manager.msg2}</span>;
    }
    // 即将过期
    if (formatTime.formatUnixTime(time) - new Date().getTime() <= (DomainSelling.day * 60)) {
      return <span className="text-orange">{this.prop.manager.msg}</span>;
    }
    return <span />;
  }
  // 校验是否可对域名编辑
  public isExpire = (time: string) => {
    // 过期
    if (new Date().getTime() > formatTime.formatUnixTime(time)) {
      return false;
    }
    return true
  }
  // 跳转到域名编辑功能
  public onGoToDetail = (domain: string) => {
    this.props.manager.detail = this.props.item;
    this.props.history.push('/manager/detail/' + domain);
  }
  // 域名转让弹筐--打开
  public onOpenTransfer = () => {
    console.log("open transfer");
    // console.log(this.props.manager.showTransfer);

    // this.props.manager.showTransfer = true;
    this.setState({
      isShowTransfer: true
    });
    console.log("after");
    // console.log(this.props.manager.showTransfer);
  }
  // 域名出售弹筐--打开
  // public onOpenSellDomain = () =>
  // {
  //   this.props.manager.showSaleDomain = true;
  // }
  // // 域名出售弹筐--关闭
  // public onCloseSellDomain = () =>
  // {
  //   this.setState({
  //     showSaleDomain: false
  //   })
  // }
  // // 域名出售金额的输入 --todo
  // public changeSellingPrice = (value: string) =>
  // {
  //   console.log(value);

  // }
  // // 域名出售发送交易
  // public toSellDomain = () =>
  // {
  //   console.log("sell domain");
  //   this.onCloseSellDomain();
  // }
  public onCloseTransfer = () => {
    this.setState({
      isShowTransfer: false
    });
  }
  public render() {
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
                          type="primary"
                          inline={true}
                          size="small"
                          style={{ width: '105px' }}
                          onClick={this.onGoToDetail.bind(this, this.props.item.domain)}
                        >编辑</Button>
                        <Button
                          type="primary"
                          inline={true}
                          size="small"
                          style={{ width: '105px' }}
                          onClick={this.onOpenTransfer}
                        >转让</Button>
                        <Button
                          type={!this.props.item.resolverAddr ? 'primary' : 'ghost'}
                          inline={true}
                          size="small"
                          style={{ width: '105px' }}
                          disabled={!!this.props.item.resolverAddr}
                        // onClick={this.onOpenSellDomain}
                        >出售</Button>
                      </div>
                    )
                  }
                  {
                    this.props.item.state === '0901' && (
                      <div className="delist-btn">
                        <Button
                          type="primary"
                          inline={true}
                          size="small"
                          style={{ width: '105px' }}
                        >下架</Button>
                      </div>
                    )
                  }
                </div>
              )
            }
          </div>
          <TransferDomain
            domain={this.props.item.domain}
            {...this.props}
            showTransfer={this.state.isShowTransfer}
            onClose={this.onCloseTransfer} />
          {/* {
            this.props.manager.showSaleDomain && (
              <Message 
                title="出售域名"
                onClose={this.onCloseSellDomain}
                onConfirm={this.toSellDomain}
                btnText="出售"
              >
                <div className="message-domainname-box">
                  <div className="content-title">域名</div>
                  <div className="domain-name">{this.props.item.domain}</div>
                  <div className="content-title">出售金额（NNC）</div>
                  <Input 
                    type="number" 
                    placeholder="" 
                    value={this.state.inputAddress} 
                    onChange={this.changeSellingPrice}
                    style={{width:'3.15rem'}}
                  />
                </div>
              </Message>
            )
          } */}
        </div>
      </React.Fragment>
    )
  }
}


export default injectIntl(ManagerList);