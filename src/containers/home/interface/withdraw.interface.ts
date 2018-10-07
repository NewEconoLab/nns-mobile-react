import { RouteComponentProps } from 'react-router-dom';
import {ICommonStore} from '@/store/interface/common.interface';

export interface InputModule {
  inputValue: string,
  status?: string,
  message?: string,
  color?: string
}

export interface IWithDrawStore {
  fee:number,
  inputModule:InputModule
}

export interface IWithDrawProps extends RouteComponentProps {
  intl:any,
  common:ICommonStore,
  withdraw:IWithDrawStore
}