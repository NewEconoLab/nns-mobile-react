import {observable,action} from 'mobx';
import * as Api from '../api/traderecord.api';
import {ITradeList, ITradeStore} from '../interface/traderecord.interface';

class TradeRecord implements ITradeStore {  
  @observable public tradeCount:number = 0;
  @observable public tradeList:ITradeList[] = [];

  @action public  getSaleOrBuyList = async(address: string, type: string, showtype: string, page: number, pagesize: number)=> {
    let result:any = null;
    try {
      result = await Api.getsaleorbuylist(address,type,showtype,page,pagesize);

    } catch (error) {
      return false;
    }
    this.tradeCount = result ? result[0].count:0;
    this.tradeList = result?result[0].list:[];
    return true;
  }
}
export default new TradeRecord();