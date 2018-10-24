import { IManagerStore } from './index.interface';
import { RouteComponentProps } from 'react-router-dom';

export interface IState {
  timelater: number,
  showResolver: boolean,
  showResolverAddr: boolean,
  detail:IDetail,
  resolverAddr:string
}

export interface IProps extends RouteComponentProps {
  intl: any,
  manager: IManagerStore
}

export interface IDetail{
  domain:string,
  resolver:string,
  resolverAddr:string
}