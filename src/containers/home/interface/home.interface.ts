import { RouteComponentProps } from 'react-router-dom';
import {ICommonStore} from '@/store/interface/common.interface';
import { IAuction } from '@/store/interface/auction.interface';
import { IMyAuctionStore } from '@/containers/myauction/interface/index.interface';
export interface IGriddataItem {
  icon:string,
  text:string,
  page:string
}

export interface InputModule {
  inputValue: string,
  status?: string,
  message?: string,
  color?: string
}

export interface IMessages {
  errmsg1:string,
  errmsg2:string,
  successmsg:string,
  successmsg2:string,
  successmsg3:string,
}

export interface IHomeStore {
  inputModule:InputModule,
  isStatus:number,
  messages:IMessages,
  auctionInfo:IAuction,
  sellingDomain:ISaleDomainInfo|null,
  isOKSale:boolean,
  getAuctionInfo:() => Promise<boolean>
}


export interface IHomeProps extends RouteComponentProps {
  intl:any,
  common:ICommonStore,
  home:IHomeStore,
  myauction:IMyAuctionStore,
}

export interface ISaleDomainInfo {
  domain: string,
  owner: string,
  ttl: number,
  price: string,
  state: string
}