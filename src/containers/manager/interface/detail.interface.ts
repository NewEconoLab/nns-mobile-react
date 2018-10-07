import {IManagerStore } from './index.interface';
import { RouteComponentProps } from 'react-router-dom';

export interface IState {
  timelater:number
}

export interface IProps extends RouteComponentProps{
  intl:any,
  manager:IManagerStore
}