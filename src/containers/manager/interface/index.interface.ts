import { RouteComponentProps } from 'react-router-dom';
import { ICommonStore } from '@/store/interface/common.interface'
import { IStatemanagerStore } from '@/store/interface/statemanager.interface';

export interface IManagerList {
  blockindex:number,   // 区块高度
  resolver: string,    // 地址解析器
  resolverAddr: string,// 地址映射
  ttl: string          // 到期时间
  domain: string,      // 域名
  price: {
    $numberDecimal:string
  },       // 出售金额  
  type:string,
  state: string,       // 域名状态  
}

export interface IManagerListProps extends RouteComponentProps {
  item: IManagerList,
  intl: any,
  manager: IManagerStore,
  statemanager:IStatemanagerStore,
}

export interface IManagerStore {
  chooseStatus: string,
  clickSellStatus: string,
  modal: boolean,
  domainList: IManagerList[],
  detail: IManagerList | null,
  myNNCBalance: string,
  pageIndex: number,
  pageSize: number,
  isLast:boolean,
  isLoading:boolean,
  getdomainbyaddress: (address: string,search:string) => Promise<boolean>,
  getNNCfromSellingHash: (address: string) => Promise<boolean>,
  // domainListFroPage: IManagerList[],
  filterDomainList:IManagerList[],
  domainAddress:IDomainAddress|null,
  getResolveAddress:(domain: string) => Promise<boolean>,
}

export interface IManagerProps extends RouteComponentProps {
  manager: IManagerStore,
  common: ICommonStore,
  intl: any,
  statemanager:IStatemanagerStore,
}
export interface IDomainAddress {
  data:string,
  TTl:number
}