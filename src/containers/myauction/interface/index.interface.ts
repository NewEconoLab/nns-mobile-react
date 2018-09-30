import { RouteComponentProps } from 'react-router-dom';

export interface IProps extends RouteComponentProps{
  a:1
}

export interface IAuctionList {
  domain:string    // 域名
}

export interface IAuctionListProps {
  item:IAuctionList
}