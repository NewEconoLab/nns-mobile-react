import { observable,action } from 'mobx';
import {IHomeStore} from '../interface/home.interface';
import common from '@/store/common'
import * as Api from '../api/home.api';
class Home implements IHomeStore{
  @observable public test:string = '';

  /**
   * 获取cgas余额
   */
  @action public async getnep5balanceofaddress() {
    let result:any = [];
    try {
      result = await Api.getnep5balanceofaddress("ATBTRWX8v8teMHCvPXovir3Hy92RPnwdEi");
    }catch(e) {
      console.log(e)
      return false;
    }
    console.log(result);
    common.cgasBalance = result[0].nep5balance;
    console.log(common.cgasBalance)
    return true;
  }
  /**
   * 获取账户中的cgas
   */
  @action public async getregisteraddressbalance() {
    let result:any = [];
    try {
      result = await Api.getregisteraddressbalance("ATBTRWX8v8teMHCvPXovir3Hy92RPnwdEi");
    }catch(e) {
      console.log(e)
      return false;
    }
    console.log(result);
    common.accountBalance = result[0].balance;
    console.log(common.accountBalance)
    return true;
  }
}
// 外部使用require
export default new Home();
