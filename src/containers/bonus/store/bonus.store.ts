import {observable, action} from 'mobx';
import {IBonusStore, IBonuseInfo} from '../interface/index.interface';
import * as Api from '../api/bonus.api';
import common from '@/store/common';

class Bonus implements IBonusStore {
  @observable public bonusList:IBonuseInfo[] = [];
  @observable public myBonusInfo:IBonuseInfo|null =null;
  @observable public applyState:number=0; // 是否可申请分红,0为不可申请，1为可申请，2为正在申请，3为已发放
  
  @action public async getCurrentBonus() {
    let result:any = [];
    try {
      result = await Api.getcurrentbonus(common.address);
    }catch(e) {
      return false;
    }
    console.log(result);
    
    this.myBonusInfo = result[0] || null;
    if (this.myBonusInfo)
        {
            const myBonus = parseFloat(result[0].send) !== 0 ? result[0].send : '0';
            if (myBonus === '0')
            {
                this.myBonusInfo.send = "0";
                return true;
            }
            if (result[0].txid !== '')
            {
                this.myBonusInfo.send = "0";
                this.applyState = 3;
            } else
            {
                if (result[0].applied)
                {
                    this.applyState = 2;
                } else
                {
                    this.applyState = 1;
                }
            }
        }
    return true;
  }
  @action public async applyBonus() {
    let result:any = [];
    try {
      result = await Api.applybonus(common.address);
    }catch(e) {
      this.applyState = 0;
      return false;
    }
    if (result[0].result)
        {
            this.applyState = 2;
        } else
        {
            this.applyState = 1;
        }
    return true;
  }
  @action public async getBonusListByAddress() {
    let result:any = [];
    try {
      result = await Api.getbonusbyaddress(common.address,1,100);
    }catch(e) {
      return false;
    }
    
    this.bonusList = result ? result[0].list : [];
    return true;
  }
}

export default new Bonus();