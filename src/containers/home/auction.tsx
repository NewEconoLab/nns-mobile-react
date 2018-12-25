
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
import taskmanager from '@/store/taskmanager';
import { Task, ConfirmType, TaskType } from '@/store/interface/taskmanager.interface';
import auctionmanager from '@/store/auctionmanager';
import { IAuction, IAuctionAddress, AuctionState } from '@/store/interface/auction.interface';
import common from '@/store/common';

// 获取竞拍状态：getauctionstate 参数：域名
@inject('common', 'home', 'myauction')
@observer
class Auction extends React.Component<IHomeProps>
{
  public prop = this.props.intl.messages;
  public state = {
    btnWait: false
  }
  public componentDidMount() {
    this.props.home.messages = {
      errmsg1: this.prop.home.auction.errmsg1,
      errmsg2: this.prop.home.auction.errmsg2,
      successmsg: this.prop.home.auction.successmsg,
      successmsg2: this.prop.home.auction.successmsg2,
      successmsg3: this.prop.home.auction.successmsg3,
    }
  }
  public change = (value: string) => {
    this.props.home.inputModule.inputValue = value;
  }
  public onStartAuction = async () => {
    this.setState({ btnWait: true });
    const roothash = nnstools.nameHash(DomainSelling.RootNeo.root);
    const res = await nnstools.startAuciton(DomainSelling.RootNeo.register, roothash, this.props.home.inputModule.inputValue);
    console.log("open");
    console.log(res);

    if (res['txid']) {
      const auction = {} as IAuction;
      auction["auctionId"] = res["txid"];
      auction["domain"] = this.props.home.inputModule.inputValue
      auction["fulldomain"] = [auction["domain"], DomainSelling.RootNeo.root].join('.');
      auction["auctionState"] = AuctionState.open;
      const who: IAuctionAddress = {} as IAuctionAddress;
      who["address"] = common.address;
      who["totalValue"] = 0;
      auction["addWho"] = who
      auctionmanager.addAuction(auction);
      taskmanager.addTask(new Task(TaskType.startAuction, ConfirmType.contract, res['txid'], { domain: auction["fulldomain"] }))
      Alert(this.prop.message.successmsg, this.prop.message.waitmsg, this.prop.btn.confirm, function () {
        return;
      });
    }
    else {
      Alert(this.prop.message.errmsg, this.prop.message.errmsgtip1, this.prop.btn.confirm, () => {
        return;
      });
    }
    this.setState({ btnWait: false });
  }
  public onRaiseAuction = async () => {
    await this.props.home.getAuctionInfo();
    this.props.myauction.detail = this.props.home.auctionInfo;
  }
  public onLookDomain = async () => {
    this.props.home.isShowSaleBox = true;
  }
  public componentWillUnmount() {
    this.props.home.inputModule.inputValue = '';
    this.props.home.inputModule.status = '';
    this.props.home.inputModule.message = '';
    this.props.home.inputModule.color = '';
  }
  public render() {
    return (
      <div className="auction-wrap box-wrap">
        <TitleText text={this.prop.home.auction.title} />
        <div className="auction-name">
          <Input
            placeholder=""
            style={{ width: "3rem" }}
            status={this.props.home.inputModule.status}
            message={this.props.home.inputModule.message}
            value={this.props.home.inputModule.inputValue}
            color={this.props.home.inputModule.color}
            onChange={this.change}
            type="text"
          />
          <span className="auction-neo">{'.' + DomainSelling.RootNeo.root}</span>
        </div>
        {
          this.props.home.inputModule.status !== 'error' &&
          <WingBlank>
            {/* 0 默认活着不可用(已结束)，1 未使用（可开拍），2 正在竞拍(可加价),3 可购买,4为开标中 */}
            {
              this.props.home.isStatus === 1 &&
              (
                this.state.btnWait
                  ? <Button type="primary" loading={true}>{this.prop.btn.startauction}</Button>
                  : <Button type="primary" onClick={this.onStartAuction}>{this.prop.btn.startauction}</Button>
              )
            }
            {
              this.props.home.isStatus === 2 &&
              <Link to="/auction/detail"><Button type="primary" onClick={this.onRaiseAuction}>{this.prop.btn.join}</Button></Link>
            }
            {
              this.props.home.isStatus === 3 &&
              (
                <Button type="primary" onClick={this.onLookDomain}>{this.prop.btn.lookinfo}</Button>
              )
            }
            {
              this.props.home.isStatus === 4 &&
              (
                <Button type="primary" loading={true}>{this.prop.btn.startauction}</Button>
              )
            }
          </WingBlank>
        }
      </div>
    );
  }
}

export default injectIntl(Auction);