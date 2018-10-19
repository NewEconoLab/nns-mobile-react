import { RouteComponentProps } from 'react-router-dom';
import {ICommonStore} from '@/store/interface/common.interface'
import { IAuction,IAuctionListStore } from '@/store/interface/auction.interface';

export interface IProps extends RouteComponentProps{
  a:1
}

// export interface IAuctionList {
//   domain:string    // 域名
//   auctionId:string,
//   maxPrice:string, // 最高价格
//   maxBuyer:string, // 出价者
//   startAddress:string, // 开标人
//   startTime:{
//     blocktime:string
//   },
//   auctionState:string, // 状态
// } 

export interface IAuctionProps extends RouteComponentProps{
  auctionmanager:IAuctionListStore,
  common:ICommonStore,
  myauction:IMyAuctionStore
}

export interface IAuctionAddbidProps extends RouteComponentProps{
  common:ICommonStore,
  myauction:IMyAuctionStore
}

export interface IMyAuctionStore {
  // auctionList:IAuctionListStore ,
  detail:IAuction | null,
  myBid:string,
  showDialog:boolean,
  modal:boolean,
  statusValue:string,
  peopleValue:string,
  clickStatus:string,
  clickPeople:string,
  // getauctioninfobyaddress:(address:string)=>Promise<boolean>,
}

export interface IAuctionListProps extends RouteComponentProps {
  item:IAuction,
  common:ICommonStore,
  intl:any,
  myauction:IMyAuctionStore,
  // auctionList:IAuctionListStore,
}

export interface IAuctionDetailProps extends RouteComponentProps{
  // auctionList:IAuctionListStore,
  myauction:IMyAuctionStore,
  common:ICommonStore,
  intl:any,
}