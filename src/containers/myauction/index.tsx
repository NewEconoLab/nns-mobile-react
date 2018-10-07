/**
 * 我的竞拍
 */
import * as React from 'react';
import { SearchBar } from 'antd-mobile';
import MyAuctionList from './auctionlist'
import {IAuctionProps, IAuctionList} from './interface/index.interface';
import {inject, observer} from 'mobx-react';

@inject('common', 'myauction')
@observer
export default class MyAuction extends React.Component<IAuctionProps>
{
  
  public componentDidMount() {
    this.props.myauction.getauctioninfobyaddress(this.props.common.address);
  }
  public render()
  {
    return (
      <div>
        <SearchBar placeholder="按域名查找" />
        {
          this.props.myauction.auctionList.map((item:IAuctionList, index:number) => {
            return (
              <MyAuctionList item={item} key={index} {...this.props}/>
            )
          })
        }
      </div>
    );
  }
}
