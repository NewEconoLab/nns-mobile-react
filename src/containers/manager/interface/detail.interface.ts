import { IManagerStore } from './index.interface';
import { RouteComponentProps } from 'react-router-dom';
import { IStatemanagerStore } from '@/store/interface/statemanager.interface';

export interface IState {
  timelater: number,
  showResolver: boolean,
  showResolverAddr: boolean,
  detail:IDetail,
  inputresolverAddr:string,// 输入映射地址
  toResoverAddr:string,// 映射地址
  inputMessage:string
}

export interface IProps extends RouteComponentProps {
  intl: any,
  manager: IManagerStore
  statemanager:IStatemanagerStore;
}

export interface IDetail{
  domain:string,
  resolver:string,
  resolverAddr:string
}