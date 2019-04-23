/**
 * 我的竞拍
 */
import * as React from 'react';
import { SearchBar, Modal, Button } from 'antd-mobile';
import TitleText from '@/components/titletext';
import MyAuctionList from './auctionlist';
import { IAuctionProps, } from './interface/index.interface';
import { inject, observer } from 'mobx-react';
import { AuctionState, IAuction } from '@/store/interface/auction.interface';
import { injectIntl } from 'react-intl';
import './index.less';
@inject('common', 'myauction', 'auctionmanager')
@observer
class MyAuction extends React.Component<IAuctionProps, any>
{
  public state: {
    searchValue: string;
    isLoadingMore: boolean,
    wrapper: HTMLDivElement | null
  } = {
      searchValue: '',
      isLoadingMore: false,
      wrapper: null
    }
  public prop = this.props.intl.messages;
  public listRef: React.RefObject<HTMLDivElement> = React.createRef();
  public componentDidMount()
  {
    this.toGetList();
    window.addEventListener('scroll', this.onScroll, false);
  }
  public toGetList = (isSelect?:boolean) =>
  {
    this.props.myauction.getauctioninfobyaddress(this.props.common.address, this.state.searchValue,isSelect)
  }
  public onScroll = () =>
  {

    if (this.props.myauction.filterAuctionList.length === 0)
    {
      return;
    }
    if (!this.listRef || !this.listRef.current)
    {
      return;
    }

    const winScroll = window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
    if (winScroll + (document.documentElement ? document.documentElement.clientHeight : 0) >= this.listRef.current.offsetHeight + this.listRef.current.offsetTop)
    {
      this.props.myauction.pageIndex++;
      this.toGetList();
    }
  }
  // 显示选项框
  public showModal = (e) =>
  {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.props.myauction.modal = true;
  }
  // 关闭选项框
  public onClose = () =>
  {
    this.props.myauction.modal = false;
    this.props.myauction.clickStatus = this.props.myauction.statusValue;
    this.props.myauction.clickPeople = this.props.myauction.peopleValue;
  }
  // 筛选状态
  public chooseStatus = (event: any) =>
  {
    const item = event.target.value;
    this.props.myauction.clickStatus = item;
  }
  // 筛选出价人
  public choosePeople = (event: any) =>
  {
    const item = event.target.value;
    this.props.myauction.clickPeople = item;
  }
  // 提交筛选
  public applyChoose = () =>
  {
    
    this.props.myauction.modal = false;
    this.props.myauction.statusValue = this.props.myauction.clickStatus;
    this.props.myauction.peopleValue = this.props.myauction.clickPeople;
    this.setState({
      searchValue: ''
    },
      () =>
      {
        this.props.myauction.filterAuctionList = [];
        this.props.myauction.pageIndex = 1;
        this.toGetList(true);
      }
    )
  }
  public onSearchChange = (value: string) =>
  {
    this.setState({
      searchValue: value
    })
    if (this.props.myauction.statusValue !== "2")
    {
      this.props.myauction.statusValue = "all";
      this.props.myauction.peopleValue = "2";
      this.props.myauction.clickStatus = "all";
      this.props.myauction.clickPeople = "2";
    }
    this.props.myauction.filterAuctionList = [];
    this.props.myauction.pageIndex = 1;
    this.toGetList(true);
  }
  public componentWillUnmount()
  {
    this.props.myauction.filterAuctionList = [];
    window.removeEventListener('scroll', this.onScroll);
    this.props.myauction.pageIndex = 1;
    this.props.myauction.isLast = false;
  }
  public render()
  {
    const srcImg = (this.props.myauction.statusValue === 'all' && this.props.myauction.peopleValue === '2') ? require('@/img/noselect.png') : require('@/img/yesselect.png');
    return (
      <div ref={this.listRef}>
        {/* {
          !!!this.props.myauction.filterAuctionList &&
          <div className="nodata-page">
            <div className="nodata-wrap">
              <ActivityIndicator animating={true} />
            </div>
          </div>
        }
         */}
        <React.Fragment>
          <div className="search-box">
            <SearchBar
              placeholder={this.prop.myauction.search}
              style={{ "width": "3rem" }}
              value={this.state.searchValue}
              onChange={this.onSearchChange} />
            <div className="select-icon" onClick={this.showModal}>
              <img src={srcImg} alt="" />
            </div>
          </div>
          
          {
            this.props.myauction.filterAuctionList.map((item: IAuction, index: number) =>
            {
              return (
                <MyAuctionList item={item} key={index} {...this.props} />
              )
            })
          }
          <Modal
            popup={true}
            visible={this.props.myauction.modal}
            onClose={this.onClose}
            animationType="slide-up"
          >
            <div className="select-box">
              <TitleText text={this.prop.myauction.selecttype} />
              <div className="select-wrap">
                <label className={this.props.myauction.clickStatus === 'all' ? 'checked-input' : ''}>{this.prop.myauction.all}<input type="radio" name='status' value="all" onChange={this.chooseStatus} /></label>
                <label className={this.props.myauction.clickStatus === AuctionState.fixed ? 'checked-input' : ''} >{this.prop.myauction.period}<input type="radio" name='status' value={AuctionState.fixed} onChange={this.chooseStatus} /></label>
                <label className={this.props.myauction.clickStatus === AuctionState.random ? 'checked-input' : ''}>{this.prop.myauction.overtime}<input type="radio" name='status' value={AuctionState.random} onChange={this.chooseStatus} /></label>
                <label className={this.props.myauction.clickStatus === AuctionState.end ? 'checked-input' : ''}>{this.prop.myauction.ended}<input type="radio" name='status' value={AuctionState.end} onChange={this.chooseStatus} /></label>
              </div>
            </div>
            <div className="select-box">
              <TitleText text={this.prop.myauction.selecttype2} />
              <div className="select-wrap">
                <label className={this.props.myauction.clickPeople === '2' ? 'checked-input' : ''}>{this.prop.myauction.all}<input type="radio" name='people' value="2" onChange={this.choosePeople} /></label>
                <label className={this.props.myauction.clickPeople === '1' ? 'checked-input' : ''} >{this.prop.myauction.me}<input type="radio" name='people' value="1" onChange={this.choosePeople} /></label>
                <label className={this.props.myauction.clickPeople === '0' ? 'checked-input' : ''}>{this.prop.myauction.other}<input type="radio" name='people' value="0" onChange={this.choosePeople} /></label>
              </div>
            </div>
            <Button type="primary" onClick={this.applyChoose} style={{ borderRadius: '0' }}>{this.prop.btn.select}</Button>
          </Modal>
        </React.Fragment>
      </div>
    );
  }
}
export default injectIntl(MyAuction);
