/**
 * 我的竞拍
 */
import * as React from 'react';
import { SearchBar } from 'antd-mobile';
import MyAuctionList from './auctionlist'
export default class MyAuction extends React.Component
{
  
  public render()
  {
    return (
      <div>
        <SearchBar placeholder="按域名查找" />
        <MyAuctionList {...this.props} />
        <MyAuctionList {...this.props} />
        <MyAuctionList {...this.props} />
        <MyAuctionList {...this.props} />
      </div>
    );
  }
}
