import { RouteComponentProps } from 'react-router-dom';
import { ICommonStore } from "@/store/interface/common.interface";

/**
 * 域名交易存储
 */
export interface ITradeStore {
    tradeCount: number,
    tradeList: ITradeList[],
    pageIndex: number,
    pageSize: number,
    isLast: boolean,
    isLoading: boolean,
    getSaleOrBuyList: (address: string, type: string, showtype: string) => Promise<boolean>,
}
/**
 * 域名交易数据类型
 */
export interface ITradeList {
    fullDomain: string,  // 交易的域名
    price: string,  // 交易金额
    time: string,     // 交易时间
}

export interface ITradeProps extends RouteComponentProps {
    traderecord: ITradeStore,
    common: ICommonStore,
    intl: any,
}
