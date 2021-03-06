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

@inject('manager', 'common','statemanager')
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
  public componentDidMount()
  {
    this.props.manager.getdomainbyaddress(this.props.common.address,'');
    window.addEventListener('scroll', this.onScroll, false);
  }

  public onScroll = () =>
  {        
    if (this.props.manager.filterDomainList.length === 0)
    {
      return;
    }
    if (!this.listRef || !this.listRef.current)
    {
      return;
    }
    const winScroll = window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
    if (winScroll + (document.documentElement ? document.documentElement.clientHeight : 0) >= this.listRef.current.offsetHeight + this.listRef.current.offsetTop )
    {
      this.props.manager.pageIndex++;
      this.props.manager.getdomainbyaddress(this.props.common.address,this.state.searchValue);
    }
  }

  public componentWillUnmount()
  {
    window.removeEventListener('scroll', this.onScroll);
    this.props.manager.pageIndex = 1;
    this.props.manager.filterDomainList = [];
    this.props.manager.domainList = [];
    this.props.manager.chooseStatus = "all";
    this.props.manager.clickSellStatus = "all"; 
    this.props.manager.isLast = false;
  }

  // 显示选项框
  public showModal = (e) =>
  {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.props.manager.modal = true;
  }
  // 关闭选项框
  public onClose = () =>
  {
    this.props.manager.modal = false;
    this.props.manager.clickSellStatus = this.props.manager.chooseStatus;
  }
  // 筛选域名状态
  public chooseSellStatus = (event: any) =>
  {
    const item = event.target.value;
    this.props.manager.clickSellStatus = item;
  }
  // 提交筛选
  public applyChoose = () =>
  {
    this.props.manager.modal = false;
    this.props.manager.chooseStatus = this.props.manager.clickSellStatus;
    this.props.manager.filterDomainList = [];
    this.props.manager.pageIndex = 1;
    this.props.manager.getdomainbyaddress(this.props.common.address,'');
    // 输入搜索置空
    this.setState({
      searchValue: ''
    }) 
  }
  public onSearchChange = (value: string) =>
  {
    this.setState({
      searchValue: value
    })
    // 筛选置空
    if (this.props.manager.chooseStatus !== "all")
    {
      this.props.manager.chooseStatus = "all";
      this.props.manager.clickSellStatus = "all";      
    }
    this.props.manager.filterDomainList = [];
    this.props.manager.pageIndex = 1;
    this.props.manager.getdomainbyaddress(this.props.common.address,value);
  }
  public render()
  {
    const srcImg = (this.props.manager.chooseStatus === 'all') ? require('@/img/noselect.png') : require('@/img/yesselect.png');
    return (
      <div className="manager-wrap box-wrap" ref={this.listRef}>
        {/* 搜索功能 */}
        <React.Fragment>
          <div className="search-box">
            <SearchBar
              placeholder={this.prop.manager.search}
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
              <TitleText text={this.prop.manager.selecttype} />
              <div className="select-wrap">
                <label className={this.props.manager.clickSellStatus === 'all' ? 'checked-input' : ''}>{this.prop.manager.all}<input type="radio" name='status' value="all" onChange={this.chooseSellStatus} /></label>
                <label className={this.props.manager.clickSellStatus === 'selling' ? 'checked-input' : ''} >{this.prop.manager.selltype}<input type="radio" name='status' value="selling" onChange={this.chooseSellStatus} /></label>
                <label className={this.props.manager.clickSellStatus === 'notSelling' ? 'checked-input' : ''}>{this.prop.manager.unselltype}<input type="radio" name='status' value="notSelling" onChange={this.chooseSellStatus} /></label>
              </div>
            </div>
            <Button type="primary" onClick={this.applyChoose} style={{ borderRadius: '0' }}>{this.prop.btn.select}</Button>
          </Modal>
        </React.Fragment>
        {/* 提取nnc */}
        <ClaimNNC {...this.props} />
        {/* 域名列表 */}
        {
          this.props.manager.filterDomainList.length !== 0 &&
          <React.Fragment>
            <div className="hastips-title">
              <h3>{this.prop.manager.title}</h3>
              <p>{this.prop.manager.note2}</p>
            </div>
            <div className="manager-list">
              {                
                this.props.manager.filterDomainList.map((item: IManagerList, index: number) =>
                {
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