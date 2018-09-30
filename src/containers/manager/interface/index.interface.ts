import { RouteComponentProps } from 'react-router-dom';

export interface IProps extends RouteComponentProps{
  a:1
}

export interface IManagerList {
  domain:string,      // 域名
  resolver:string,    // 地址解析器
  resolverAddr:string,// 地址映射
  ttl:string          // 到期时间
}

export interface IManagerListProps {
  item:IManagerList
}

export interface IManagerStore {
  domainList:IManagerList[],
  getdomainbyaddress:()=>void,
}

export interface IManagerProps{
  manager:IManagerStore
}