/**
 * 分红列表数据类型
 */
export interface IBonusList {
  addrBonus: string,  // 我的分红
  totalValue: string,  // 奖金池快照
  balance: string,     // 我的NNC总量
  blocktime: string    // 我的NNC总量
}

export interface IBonusListProps {
  item: IBonuseInfo,
  intl: any,
}
/**
 * 分红页的数据存储
 */
export interface IBonusStore {
  bonusList: IBonuseInfo[],
  myBonusInfo: IBonuseInfo | null,
  applyState: number,
  pageIndex: number,
  pageSize: number,
  isLast: boolean,
  isLoading: boolean,
  getBonusListByAddress: () => Promise<boolean>,
  getCurrentBonus: () => Promise<boolean>,
  applyBonus: () => Promise<boolean>
}

export interface IBonusProps {
  bonus: IBonusStore,
  intl: any
}

export interface IBonuseInfo {
  addr: string,
  applied: boolean,
  assetid: string,
  balance: string,
  blocktime: string,
  height: number,
  send: string,
  sendAssetid: string,
  totalSend: string,
  txid: string
}