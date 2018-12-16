import { observable, action } from 'mobx';
import * as Api from '../api/traderecord.api';
import { ITradeList, ITradeStore } from '../interface/traderecord.interface';

class TradeRecord implements ITradeStore {
  @observable public tradeCount: number = 0;
  @observable public tradeList: ITradeList[] = [];
  @observable public pageIndex: number = 1;
  @observable public pageSize: number = 10;
  @observable public isLast: boolean = false;
  @observable public isLoading: boolean = false;

  @action public getSaleOrBuyList = async (address: string, type: string, showtype: string) => {
    // 如果是last 或者 上一条还在加载中 就 return
    if (this.isLast || this.isLoading) {
      return true;
    }
    // 设置正在加载中
    this.isLoading = true;
    let result: any = null;
    try {
      result = await Api.getsaleorbuylist(address, type, showtype, this.pageIndex, this.pageSize);

    } catch (error) {
      // 报错 了统一认为到底部了
      this.isLast = true;
      return false;
    } finally {
      // 加载完成 后 把 值设置成 false
      this.isLoading = false;
    }

    const list = result ? result[0].list : [];
    // 如果加载到的没结果了，认为是 last 最后一页了
    if (list.length === 0) {
      this.isLast = true;
    }
    // 每次都往里面push
    this.tradeList.push(...list);
    this.tradeCount = this.tradeList.length || 0;
    return true;
  }
}
export default new TradeRecord();