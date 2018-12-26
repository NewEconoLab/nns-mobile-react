import { RouteComponentProps } from 'react-router-dom';
import {ICommonStore} from '@/store/interface/common.interface';
import { IAuction } from '@/store/interface/auction.interface';
import { IMyAuctionStore } from '@/containers/myauction/interface/index.interface';
import { IStatemanagerStore } from '@/store/interface/statemanager.interface';
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
  isOKBuy:boolean,
  isShowSaleBox:boolean,
  reChargeResult:IRechargeResult|null,
  getAuctionInfo:() => Promise<boolean>,
  getSaleDomainInfo:() => Promise<boolean>,
  getnep5balanceofaddress:() => Promise<boolean>,
  reChargeandtransfer:(data1: Uint8Array, data2: Uint8Array) => Promise<boolean>
}


export interface IHomeProps extends RouteComponentProps {
  intl:any,
  common:ICommonStore,
  home:IHomeStore,
  myauction:IMyAuctionStore,
  statemanager:IStatemanagerStore,
}

export interface ISaleDomainInfo {
  domain: string,
  owner: string,
  ttl: number,
  price: string,
  state: string
}

export interface IRechargeResult {
  errCode:string,
  errMessage:string,
  txid:string
}