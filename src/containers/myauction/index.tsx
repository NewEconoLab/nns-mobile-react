/**
 * 我的竞拍
 */
import * as React from 'react';
import { SearchBar,Modal,Button } from 'antd-mobile';
import TitleText from '@/components/titletext';
// import MyAuctionList from './auctionlist';
import { IAuctionProps } from './interface/index.interface';
import { inject, observer } from 'mobx-react';
// import { IAuction } from '@/store/interface/auction.interface';
@inject('common', 'myauction','auctionmanager')
@observer
export default class MyAuction extends React.Component<IAuctionProps>
{
  
  // 显示选项框
  public showModal =  (e) =>
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
  }
  // 循环加载dom
  public myAuctionList = ()=>{
    console.log("auctionlist");
    // console.log(this.props.auctionmanager);
    const auctionList = this.props.auctionmanager.auctionList;
    console.log(typeof auctionList);
    
    console.log(auctionList);
    // let list:IAuction[];
    for (const auctionId in auctionList) {
      if (auctionList.hasOwnProperty(auctionId)) {
        // const auction = auctionList[auctionId];
        // console.log("循环里");        
        // console.log(auction)
        // list.push(auction);
        // console.log("打印");
        // console.log(list)
        // return <MyAuctionList item={auctionList} key={auctionList['auctionId']} {...this.props} />
      }
    }
    // <MyAuctionList item={list} key={list['auctionId']} {...this.props} />
    return <div />
  }
  public componentDidMount()
  {
    console.log(this.props.auctionmanager.auctionList);
    
    // this.props.auctionParam.getauctioninfobyaddress(this.props.common.address);
  }
  public render()
  {
    const srcImg = (this.props.myauction.statusValue === 'all' && this.props.myauction.peopleValue === 'all' )?require('@/img/noselect.png'):require('@/img/yesselect.png');
    return (
      <div>
        <div className="search-box">
          <SearchBar placeholder="按域名查找" style={{ "width": "85%" }} />
          <div className="select-icon" onClick={this.showModal}>
            <img src={srcImg} alt="" />
          </div>
        </div>
        {this.myAuctionList()}
        {/* {
          this.props.auctionManager.auctionList.map((item: IAuctionList, index: number) =>
          {
            return (
              <MyAuctionList item={item} key={index} {...this.props} />
            )
          })
        } */}
        {/* <MyAuctionList item={item} key={index} {...this.props} /> */}
        <Modal
          popup={true}
          visible={this.props.myauction.modal}
          onClose={this.onClose}
          animationType="slide-up"
        >
          <div className="select-box">
            <TitleText text="选择筛选状态" />
            <div className="select-wrap">
              <label className={this.props.myauction.clickStatus === 'all' ? 'checked-input' : ''}>全部<input type="radio" name='status' value="all" onChange={this.chooseStatus} /></label>
              <label className={this.props.myauction.clickStatus === 'period' ? 'checked-input' : ''} >确定期<input type="radio" name='status' value="period" onChange={this.chooseStatus} /></label>
              <label className={this.props.myauction.clickStatus === 'overtime' ? 'checked-input' : ''}>随机期<input type="radio" name='status' value="overtime" onChange={this.chooseStatus} /></label>
              <label className={this.props.myauction.clickStatus === 'ended' ? 'checked-input' : ''}>已结束<input type="radio" name='status' value="ended" onChange={this.chooseStatus} /></label>
            </div>
          </div>
          <div className="select-box">
            <TitleText text="选择筛选出价人" />
            <div className="select-wrap">
              <label className={this.props.myauction.clickPeople === 'all' ? 'checked-input' : ''}>全部<input type="radio" name='people' value="all" onChange={this.choosePeople} /></label>
              <label className={this.props.myauction.clickPeople === 'me' ? 'checked-input' : ''} >我<input type="radio" name='people' value="me" onChange={this.choosePeople} /></label>
              <label className={this.props.myauction.clickPeople === 'other' ? 'checked-input' : ''}>他人<input type="radio" name='people' value="other" onChange={this.choosePeople} /></label>
            </div>
          </div>
          <Button type="primary" onClick={this.applyChoose} style={{ borderRadius: '0' }}>筛选</Button>
        </Modal>
      </div>
    );
  }
}
