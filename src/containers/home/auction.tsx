
/**
 * nns主页下的域名竞拍模块
 */
import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import './index.less'
import Input from '@/components/Input/Input'
import Alert from '@/components/alert';
import TitleText from '@/components/titletext';
import { Button, WingBlank } from 'antd-mobile';
// 引入数据类型
import { IHomeProps } from '@/containers/home/interface/home.interface';
import { injectIntl } from 'react-intl'
import { nnstools } from '@/utils/nnstools';
import DomainSelling from '@/store/DomainSelling';

// 获取竞拍状态：getauctionstate 参数：域名
@inject('common', 'home','myauction')
@observer
class Auction extends React.Component<IHomeProps>
{
  public prop = this.props.intl.messages;
  public componentDidMount() {
    this.props.home.messages = {
      errmsg1: this.prop.home.auction.errmsg1,
      errmsg2: this.prop.home.auction.errmsg2,
      successmsg: this.prop.home.auction.successmsg,
      successmsg2: this.prop.home.auction.successmsg2
    }
  }
  public change = (value: string) => {
    this.props.home.inputModule.inputValue = value;
  }
  public onStartAuction = async () => {
    const roothash = nnstools.nameHash("neo");
    nnstools.startAuciton(DomainSelling.RootNeo.register,roothash,this.props.home.inputModule.inputValue)
    Alert(this.prop.message.successmsg, this.prop.message.waitmsg, this.prop.btn.confirm, function () {
      alert('我点击了确认按钮')
    });
  }
  public onRaiseAuction = async () => 
  {
    this.props.myauction.detail = this.props.home.auctionInfo;
  }
  public render() {
    return (
      <div className="auction-wrap box-wrap">
        <TitleText text={this.prop.home.auction.title} />
        <div className="auction-name">
          <Input
            placeholder=""
            style={{ width: 300 }}
            status={this.props.home.inputModule.status}
            message={this.props.home.inputModule.message}
            value={this.props.home.inputModule.inputValue}
            color={this.props.home.inputModule.color}
            onChange={this.change}
            type="text"
          />
          <span className="auction-neo">.neo</span>
        </div>
        {
          this.props.home.inputModule.status !== 'error' &&
          <WingBlank>
            {
              this.props.home.isStatus === 1 &&
              <Button type="primary" onClick={this.onStartAuction}>{this.prop.btn.startauction}</Button>
            }
            {
              this.props.home.isStatus === 2 &&
              <Link to="/auction/detail"><Button type="primary" onClick={this.onRaiseAuction}>{this.prop.btn.join}</Button></Link>
            }
          </WingBlank>
        }
      </div>
    );
  }
}

export default injectIntl(Auction);