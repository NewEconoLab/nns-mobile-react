/**
 * 域名管理
 */
import * as React from 'react';
import TitleText from '@/components/titletext';
import ManagerList from './managerlist'
import { IManagerList, IManagerProps } from './interface/index.interface';
import { observer, inject } from 'mobx-react'
import './index.less';
import ClaimNNC from './claimnnc';
import { injectIntl } from 'react-intl';
import { Modal, Button, SearchBar } from 'antd-mobile';

// 接口"getdomainbyaddress", 参数："ATBTRWX8v8teMHCvPXovir3Hy92RPnwdEi",".neo"
@inject('manager', 'common')
@observer
class Manager extends React.Component<IManagerProps, any>
{
  public prop = this.props.intl.messages;
  public listRef: React.RefObject<HTMLDivElement> = React.createRef();
  public state: {
    searchValue: string;
    isLoadingMore: boolean,
    wrapper: HTMLDivElement | null
  } = {
      searchValue: '',
      isLoadingMore: false,
      wrapper: null
    }
  public componentDidMount() {
    this.props.manager.getdomainbyaddress(this.props.common.address);
    window.addEventListener('scroll', this.onScroll, false);
  }

  public onScroll = () => {
    if (this.props.manager.domainList.length === 0) {
      return;
    }
    if (!this.listRef || !this.listRef.current) {
      return;
    }

    const winScroll = window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
    if (winScroll + (document.documentElement ? document.documentElement.clientHeight : 0) >= this.listRef.current.offsetHeight + this.listRef.current.offsetTop + 46) {
      this.props.manager.pageIndex++;
    }

  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    this.props.manager.pageIndex = 0;
  }

  // 显示选项框
  public showModal = (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.props.manager.modal = true;
  }
  // 关闭选项框
  public onClose = () => {
    this.props.manager.modal = false;
    this.props.manager.clickSellStatus = this.props.manager.clickSellStatus;
    console.log("close");

  }
  // 筛选域名状态
  public chooseSellStatus = (event: any) => {
    const item = event.target.value;
    this.props.manager.clickSellStatus = item;
  }
  // 提交筛选
  public applyChoose = () => {
    this.props.manager.modal = false;

  }
  public onSearchChange = (value: string) => {
    this.setState({
      searchValue: value
    })
    const list = this.props.manager.domainList;
    const newList = {};
    const keysArr: string[] = Object.keys(list);
    keysArr.forEach((key: string, index: number) => {
      if (list[key].domain.indexOf(value) !== -1) {
        // if(list[key].auctionState!==AuctionState.open)
        // {
        newList[key] = list[key];
        // }
      }
    })

    // if (this.props.myauction.statusValue !== "0")
    // {
    //   this.props.myauction.statusValue = "0";
    //   this.props.myauction.peopleValue = "0";
    //   this.props.myauction.clickStatus = "0";
    //   this.props.myauction.clickPeople = "0";
    // }
    // this.props.manager.filterAuctionList = newList;
    // this.props.manager.sortFilterAuctionList();
  }
  public render() {
    // const srcImg = (this.props.myauction.statusValue === '0' && this.props.myauction.peopleValue === '0') ? require('@/img/noselect.png') : require('@/img/yesselect.png');
    const srcImg = require('@/img/noselect.png');
    return (
      <div className="manager-wrap" ref={this.listRef}>
        {/* 搜索功能 */}
        <React.Fragment>
          <div className="search-box">
            <SearchBar
              placeholder={this.prop.myauction.search}
              style={{ "width": "3rem" }}
              value={this.state.searchValue}
              onChange={this.onSearchChange}
            />
            <div className="select-icon" onClick={this.showModal}>
              <img src={srcImg} alt="" />
            </div>
          </div>
          <Modal
            popup={true}
            visible={this.props.manager.modal}
            onClose={this.onClose}
            animationType="slide-up"
          >
            <div className="select-box">
              <TitleText text={this.prop.myauction.selecttype2} />
              <div className="select-wrap">
                <label className={this.props.manager.clickSellStatus === '0' ? 'checked-input' : ''}>{this.prop.myauction.all}<input type="radio" name='people' value="0" onChange={this.chooseSellStatus} /></label>
                <label className={this.props.manager.clickSellStatus === '1' ? 'checked-input' : ''} >上架中<input type="radio" name='people' value="1" onChange={this.chooseSellStatus} /></label>
                <label className={this.props.manager.clickSellStatus === '2' ? 'checked-input' : ''}>出售中<input type="radio" name='people' value="2" onChange={this.chooseSellStatus} /></label>
              </div>
            </div>
            <Button type="primary" onClick={this.applyChoose} style={{ borderRadius: '0' }}>{this.prop.btn.select}</Button>
          </Modal>
        </React.Fragment>
        {/* 提取nnc */}
        <ClaimNNC {...this.props} />
        {/* 域名列表 */}
        {
          this.props.manager.domainList.length !== 0 &&
          <React.Fragment>
            <div className="hastips-title">
              <h3>{this.prop.manager.title}</h3>
              <p>注意：如果您要出售您的地址，请确保域名的地址映射栏处于未配置的状态（设置过的域名请在在编辑页中使用重置功能。）</p>
            </div>
            <div className="manager-list">
              {
                this.props.manager.domainListFroPage.map((item: IManagerList, index: number) => {
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