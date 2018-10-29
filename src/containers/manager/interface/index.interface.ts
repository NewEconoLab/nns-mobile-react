import { RouteComponentProps } from 'react-router-dom';
import {ICommonStore} from '@/store/interface/common.interface'

export interface IManagerList {
  domain:string,      // 域名
  resolver:string,    // 地址解析器
  resolverAddr:string,// 地址映射
  ttl:string          // 到期时间
}

export interface IManagerListProps extends RouteComponentProps {
  item:IManagerList,
  intl:any,
  manager:IManagerStore,
}

export interface IManagerStore {
  domainList:IManagerList[],
  detail:IManagerList | null,
  getdomainbyaddress:(address:string)=>void,
}

export interface IManagerProps extends RouteComponentProps{
  manager:IManagerStore,
  common:ICommonStore,
  intl:any
}