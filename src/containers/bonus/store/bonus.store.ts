import { observable, action } from 'mobx';
import { IBonusStore, IBonuseInfo } from '../interface/index.interface';
import * as Api from '../api/bonus.api';
import common from '@/store/common';

class Bonus implements IBonusStore {
  @observable public bonusList: IBonuseInfo[] = [];
  @observable public myBonusInfo: IBonuseInfo | null = null;
  @observable public applyState: number = 0; // 是否可申请分红,0为不可申请，1为可申请，2为正在申请，3为已发放
  @observable public pageIndex: number = 1;
  @observable public pageSize: number = 10;
  @observable public isLast: boolean = false;
  @observable public isLoading: boolean = false;

  @action public async getCurrentBonus() {
    let result: any = [];
    try {
      result = await Api.getcurrentbonus(common.address);
    } catch (e) {
      return false;
    }
    this.myBonusInfo = result[0] || null;
    if (this.myBonusInfo) {
      const myBonus = parseFloat(result[0].send) !== 0 ? result[0].send : '0';
      if (myBonus === '0') {
        this.myBonusInfo.send = "0";
        return true;
      }
      if (result[0].txid !== '') {
        this.myBonusInfo.send = "0";
        this.applyState = 3;
      } else {
        if (result[0].applied) {
          this.applyState = 2;
        } else {
          this.applyState = 1;
        }
      }
    }
    return true;
  }
  @action public async applyBonus() {
    let result: any = [];
    try {
      result = await Api.applybonus(common.address);
    } catch (e) {
      this.applyState = 0;
      return false;
    }
    if (result[0].result) {
      this.applyState = 2;
    } else {
      this.applyState = 1;
    }
    return true;
  }
  @action public async getBonusListByAddress() {
    // 如果是last 或者 上一条还在加载中 就 return
    if (this.isLast || this.isLoading) {
      return true;
    }
    // 设置正在加载中
    this.isLoading = true;
    let result: any = [];
    try {
      result = await Api.getbonusbyaddress(common.address, 1, 100);
    } catch (e) {
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
    this.bonusList.push(...list)
    return true;
  }
}



export default new Bonus();