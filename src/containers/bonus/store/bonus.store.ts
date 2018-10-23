import {observable, action} from 'mobx';
import {IBonusStore, IBonusList} from '../interface/index.interface';
import * as Api from '../api/bonus.api';
import common from '@/store/common';

class Bonus implements IBonusStore {
  @observable public bonusList:IBonusList[] = [];

  @action public async getBonusListByAddress() {
    let result:any = [];
    try {
      result = await Api.getBonusListByAddress(common.address,1,10);
    }catch(e) {
      console.log(e)
      return false;
    }
    this.bonusList = result[0].list;
    return true;
  }
}

export default new Bonus();