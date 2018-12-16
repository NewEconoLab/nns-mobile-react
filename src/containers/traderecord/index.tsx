/**
 * 交易记录
 */
import * as React from 'react';
import './index.less'
import { observer, inject } from 'mobx-react';
import { ITradeProps } from './interface/traderecord.interface';
import * as formatTime from 'utils/formatTime';
import { injectIntl } from 'react-intl';
import DomainSelling from '@/store/DomainSelling';

@inject('common', 'traderecord')
@observer
class TradeRecord extends React.Component<ITradeProps, any> {
  public state = {
    page: 1,
    pageSize: 15,
    showListType: 'sale'
  }
  public prop = this.props.intl.messages;
  public listRef: React.RefObject<HTMLDivElement> = React.createRef();
  public componentDidMount() {
    this.toGetList();
    window.addEventListener('scroll', this.onScroll, false);
  }
  public onScroll = () => {
    if (this.props.traderecord.tradeList.length === 0) {
      return;
    }
    if (!this.listRef || !this.listRef.current) {
      return;
    }

    const winScroll = window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
    if (winScroll + (document.documentElement ? document.documentElement.clientHeight : 0) >= this.listRef.current.offsetHeight + this.listRef.current.offsetTop + 46) {
      this.props.traderecord.pageIndex++;
      this.toGetList();
    }

  }
  public componentWillUnmount() {
    this.props.traderecord.tradeCount = 0;
    this.props.traderecord.tradeList = [];
    window.removeEventListener('scroll', this.onScroll);
    this.props.traderecord.pageIndex = 1;
    this.props.traderecord.isLast = false;
  }
  public toShowMySellDomain = () => {
    if (this.state.showListType === 'sale') {
      return
    }
    this.setState({
      page: 1,
      showListType: 'sale'
    }, () => {
      this.props.traderecord.pageIndex = 1;
      this.props.traderecord.isLast = false;
      this.props.traderecord.tradeList = [];
      this.toGetList();
    })
  }
  public toShowMyBuyDomain = () => {
    if (this.state.showListType === 'buy') {
      return
    }
    this.setState({
      page: 1,
      showListType: 'buy'
    }, () => {
      this.props.traderecord.pageIndex = 1;
      this.props.traderecord.isLast = false;
      this.props.traderecord.tradeList = [];
      this.toGetList();
    })
  }
  public toGetList = () => {
    this.props.traderecord.getSaleOrBuyList(this.props.common.address, '.' + DomainSelling.RootNeo.root, this.state.showListType)
  }
  public render() {
    return (
      <div className="trade-page" ref={this.listRef}>
        <div className="trade-title">
          <span
            className={this.state.showListType === 'sale' ? 'active' : ''}
            onClick={this.toShowMySellDomain}>我出售的</span>
          <span
            className={this.state.showListType === 'buy' ? 'active' : ''}
            onClick={this.toShowMyBuyDomain}>我购买的</span>
        </div>
        {
          this.props.traderecord.tradeCount !== 0 && (
            <div className="trade-content">
              {
                Object.keys(this.props.traderecord.tradeList).map((item: string, index: number) => {
                  return (
                    <div className="trade-list" key={item}>
                      <strong>{this.props.traderecord.tradeList[index].fullDomain}</strong>
                      <p>交易金额：{this.props.traderecord.tradeList[index].price} NNC</p>
                      <p>交易时间：
                                 {formatTime.format('yyyy/MM/dd hh:mm:ss', this.props.traderecord.tradeList[index].time.toString(), this.props.intl.locale)}
                      </p>
                    </div>
                  )
                })
              }
            </div>
          )
        }
        {
          this.props.traderecord.tradeCount === 0 &&
          <div className="nodata-page">
            <div className="nodata-wrap">
              <img src={require('@/img/nodata.png')} alt="" />
              <p>{this.prop.message.empty}</p>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default injectIntl(TradeRecord);
