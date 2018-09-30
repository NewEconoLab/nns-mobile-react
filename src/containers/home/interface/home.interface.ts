import { RouteComponentProps } from 'react-router-dom';
export interface IGriddataItem {
  icon:string,
  text:string,
  page:string
}

export interface IHomeStore {
  // accountBalance:string,
  // cgasBalance:string,
  getnep5balanceofaddress:() => void,
  getregisteraddressbalance:() => void
}

export interface IHomeProps extends RouteComponentProps {
  home:IHomeStore,
  intl:any
}