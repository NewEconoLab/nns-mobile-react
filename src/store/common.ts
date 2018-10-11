// 存储全局变量

import { observable, action } from 'mobx';
 import * as Api from '@/store/api/common.api';
class Common{
  @observable public title:string = ''; // 标题
  @observable public language:string = 'zh';  // 当前语言
  @observable public address:string = 'ATBTRWX8v8teMHCvPXovir3Hy92RPnwdEi'; // 当前地址
  @observable public publicKey:string='';
  @observable public network:string = 'testnet';  // 当前网络
  @observable public accountBalance:string = '';    // 账户中的cgas
  @observable public cgasBalance:string = '';       // CGAS余额

  /**
   * 获取cgas余额
   */
  @action public async getnep5balanceofaddress() {
    let result:any = [];
    try {
      result = await Api.getnep5balanceofaddress(this.address);
    }catch(e) {
      console.log(e)
      this.cgasBalance = '0';
      return false;
    }
    console.log(result);
    this.cgasBalance = Neo.Fixed8.parse(result[0].nep5balance).toString();
    console.log(this.cgasBalance)
    return true;
  }
  /**
   * 获取账户中的cgas
   */
  @action public async getregisteraddressbalance() {
    let result:any = [];
    try {
      result = await Api.getregisteraddressbalance(this.address);
    }catch(e) {
      console.log(e)
      this.accountBalance = '0';
      return false;
    }
    console.log(result);
    this.accountBalance = Neo.Fixed8.parse(result[0].balance).toString();
    console.log(this.accountBalance)
    return true;
  }

  @action public sendrawtransaction = async (toHex:string) => {
    let result:any = null;
    try {
      result =  await Api.sendrawtransaction(toHex);
    }catch(e) {
      return false;
    }
    if(!result.txid) {
      return false;
    }
    
    return true;
  }
}

// 外部使用require
export default new Common();
