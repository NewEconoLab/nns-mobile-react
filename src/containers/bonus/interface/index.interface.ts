// import { RouteComponentProps } from 'react-router-dom';

// export interface IProps extends RouteComponentProps{
//   a:1
// }
/**
 * 分红列表数据类型
 */
export interface IBonusList {
  addrBonus:string,  // 我的分红
  totalValue:string,  // 奖金池快照
  balance:string,     // 我的NNC总量
  blocktime:string    // 我的NNC总量
}

export interface IBonusListProps {
  item:IBonusList,
  intl:any,
}
/**
 * 分红页的数据存储
 */
export interface IBonusStore {
  bonusList:IBonusList[],
  getBonusListByAddress:() => void
}

export interface IBonusProps {
  bonus:IBonusStore
}