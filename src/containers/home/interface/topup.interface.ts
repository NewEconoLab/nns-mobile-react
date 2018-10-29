import { RouteComponentProps } from 'react-router-dom';
import {ICommonStore} from '@/store/interface/common.interface';

export interface InputModule {
  inputValue: string,
  status?: string,
  message?: string,
  color?: string
}
export interface ITopupMessages{
  msg:string,
  errmsg:string
}

export interface ITopupStore {
  fee:number,
  inputModule:InputModule,
  messages:ITopupMessages
}

export interface ITopupProps extends RouteComponentProps {
  intl:any,
  common:ICommonStore,
  topup:ITopupStore
}