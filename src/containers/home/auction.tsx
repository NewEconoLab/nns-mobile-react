
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


// 获取竞拍状态：getauctionstate 参数：域名
@inject('common', 'home')
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
    // todo
    await this.props.common.sendrawtransaction('8000000149f2db1d71febefe9d12e6e840e988a28ab516134b38e948f8051ea0cc0f22cb010002e72d286979ee6cb1b7e65dfddfb2e384100b8d148e7758de42e4168b71792c6040420f00000000008c8ed58be92fd1b01896dd9e02acd45776eb3e8ce72d286979ee6cb1b7e65dfddfb2e384100b8d148e7758de42e4168b71792c60203e57d4e8000000b7b0b2d92b970affd9567faf10205ca222e389330141406ca464fdaab4a63d4bf2737c2035944fcef8511caaa59aa0bdf73107dd93825b66344b107cf6b9c13aa9baa6749217541d94d56e54f2cc9a6bc54e0da36c6c6e2321029020fd0914c677a1ab7d8b3502ca9a4506efbf7572ea24fb3862f48dd153ee5bac');

    Alert(this.prop.message.successmsg, this.prop.message.waitmsg, this.prop.btn.confirm, function () {
      alert('我点击了确认按钮')
    });
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
              <Link to="/auction"><Button type="primary">{this.prop.btn.join}</Button></Link>
            }
          </WingBlank>
        }
      </div>
    );
  }
}

export default injectIntl(Auction);