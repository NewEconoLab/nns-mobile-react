/**
 * 我的竞拍
 */
import * as React from 'react';
import { SearchBar, Modal, Button, ActivityIndicator } from 'antd-mobile';
import TitleText from '@/components/titletext';
import MyAuctionList from './auctionlist';
import { IAuctionProps, IAuctionState } from './interface/index.interface';
import { inject, observer } from 'mobx-react';
import { AuctionState } from '@/store/interface/auction.interface';
@inject('common', 'myauction', 'auctionmanager')
@observer
export default class MyAuction extends React.Component<IAuctionProps, IAuctionState>
{
  public state = {
    searchValue: ''
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

    const list = this.props.auctionmanager.auctionList;
    let newList = {};
    let keysArr: string[] = [];

    if (this.props.myauction.statusValue.toString() === "0")
    {
      this.props.auctionmanager.filterAuctionList = list;
    } else
    {
      keysArr = Object.keys(this.props.auctionmanager.auctionList).filter((keys: string) =>
      {
        if (list[keys].auctionState === this.props.myauction.statusValue)
        {
          return true;
        }

        return false;
      })

      keysArr.forEach((keys) =>
      {
        if(list[keys].auctionState!==AuctionState.open)
        {
          newList[keys] = list[keys];
        }
      })
      this.props.auctionmanager.filterAuctionList = newList;
    }

    if (this.props.myauction.peopleValue.toString() !== "0")
    {
      keysArr = Object.keys(this.props.auctionmanager.filterAuctionList).filter((keys: string) =>
      {
        if (this.props.myauction.peopleValue.toString() === "1")
        {
          if (this.props.auctionmanager.filterAuctionList[keys].maxBuyer === this.props.common.address)
          {
            return true;
          }
          return false;
        } else
        {
          if (this.props.auctionmanager.filterAuctionList[keys].maxBuyer !== this.props.common.address)
          {
            return true;
          }
          return false;
        }

      })

      newList = {};
      keysArr.forEach((keys) =>
      {
        newList[keys] = list[keys];
      })
      this.setState({
        searchValue: ''
      })
      this.props.auctionmanager.filterAuctionList = newList;
      this.props.auctionmanager.sortFilterAuctionList();
    }

  }
  public onSearchChange = (value: string) =>
  {
    this.setState({
      searchValue: value
    })
    const list = this.props.auctionmanager.auctionList;
    const newList = {};
    const keysArr: string[] = Object.keys(list);
    keysArr.forEach((key: string, index: number) =>
    {
      if (list[key].domain.indexOf(value) !== -1)
      {
        if(list[key].auctionState!==AuctionState.open)
        {
          newList[key] = list[key];
        }
      }
    })

    if (this.props.myauction.statusValue !== "0")
    {
      this.props.myauction.statusValue = "0";
      this.props.myauction.peopleValue = "0";
      this.props.myauction.clickStatus = "0";
      this.props.myauction.clickPeople = "0";
    }
    this.props.auctionmanager.filterAuctionList = newList;
    this.props.auctionmanager.sortFilterAuctionList();
  }
  public componentWillUnmount() {
    this.props.auctionmanager.filterAuctionList = this.props.auctionmanager.auctionList;
  }
  public render()
  {
    const srcImg = (this.props.myauction.statusValue === '0' && this.props.myauction.peopleValue === '0') ? require('@/img/noselect.png') : require('@/img/yesselect.png');
    return (
      <div>
        {
          !!!Object.keys(this.props.auctionmanager.auctionList) &&
          <div className="nodata-page">
            <div className="nodata-wrap">
              <ActivityIndicator animating={true} />
            </div>
          </div>
        }
        {
          Object.keys(this.props.auctionmanager.auctionList).length === 0 &&
          <div className="nodata-page">
            <div className="nodata-wrap">
              <img src={require('@/img/nodata.png')} alt="" />
              <p>这里是空的</p>
            </div>
          </div>
        }
        {
          Object.keys(this.props.auctionmanager.auctionList).length !== 0 &&
          <React.Fragment>
            <div className="search-box">
              <SearchBar
                placeholder="按域名查找"
                style={{ "width": "3rem" }}
                value={this.state.searchValue}
                onChange={this.onSearchChange} />
              <div className="select-icon" onClick={this.showModal}>
                <img src={srcImg} alt="" />
              </div>
            </div>

            {
              Object.keys(this.props.auctionmanager.filterAuctionList).map((item: string, index: number) =>
              {
                if(this.props.auctionmanager.filterAuctionList[item].auctionState!==AuctionState.open)
                {
                  return (
                    <MyAuctionList item={this.props.auctionmanager.filterAuctionList[item]} key={index} {...this.props} />
                  )
                }return
              })
            }
            <Modal
              popup={true}
              visible={this.props.myauction.modal}
              onClose={this.onClose}
              animationType="slide-up"
            >
              <div className="select-box">
                <TitleText text="选择筛选状态" />
                <div className="select-wrap">
                  <label className={this.props.myauction.clickStatus === '0' ? 'checked-input' : ''}>全部<input type="radio" name='status' value="0" onChange={this.chooseStatus} /></label>
                  <label className={this.props.myauction.clickStatus === AuctionState.fixed ? 'checked-input' : ''} >确定期<input type="radio" name='status' value={AuctionState.fixed} onChange={this.chooseStatus} /></label>
                  <label className={this.props.myauction.clickStatus === AuctionState.random ? 'checked-input' : ''}>随机期<input type="radio" name='status' value={AuctionState.random} onChange={this.chooseStatus} /></label>
                  <label className={this.props.myauction.clickStatus === AuctionState.end ? 'checked-input' : ''}>已结束<input type="radio" name='status' value={AuctionState.end} onChange={this.chooseStatus} /></label>
                </div>
              </div>
              <div className="select-box">
                <TitleText text="选择筛选出价人" />
                <div className="select-wrap">
                  <label className={this.props.myauction.clickPeople === '0' ? 'checked-input' : ''}>全部<input type="radio" name='people' value="0" onChange={this.choosePeople} /></label>
                  <label className={this.props.myauction.clickPeople === '1' ? 'checked-input' : ''} >我<input type="radio" name='people' value="1" onChange={this.choosePeople} /></label>
                  <label className={this.props.myauction.clickPeople === '2' ? 'checked-input' : ''}>他人<input type="radio" name='people' value="2" onChange={this.choosePeople} /></label>
                </div>
              </div>
              <Button type="primary" onClick={this.applyChoose} style={{ borderRadius: '0' }}>筛选</Button>
            </Modal>
          </React.Fragment>
        }

      </div>
    );
  }
}
