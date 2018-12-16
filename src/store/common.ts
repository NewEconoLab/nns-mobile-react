// 存储全局变量

import { observable, action } from 'mobx';
import * as Api from '@/store/api/common.api';
import { $_GET } from '@/utils/paramstool';
class Common {
  @observable public title: string = ''; // 标题
  @observable public language: string = 'zh';  // 当前语言
  @observable public address: string = 'ATBTRWX8v8teMHCvPXovir3Hy92RPnwdEi'; // 当前地址
  @observable public publicKey: string = '';
  @observable public network: string = 'testnet';  // 当前网络
  @observable public accountBalance: string = '';    // 账户中的cgas
  @observable public cgasBalance: string = '';       // CGAS余额
  @observable public fee: Neo.Fixed8 = Neo.Fixed8.Zero;

  @action public initWalletConfig = () => {
    const params: {} = $_GET();
    if (Object.keys(params).length > 0) {
      const fee = params[`fee`];
      const wallet = params[`wallet`];
      const network = params[`net`];
      const language = params[`lang`];
      this.fee = Neo.Fixed8.fromNumber(fee);
      this.network = network;
      this.language = language;
      console.log(wallet);
    }
  }

  /**
   * 获取cgas余额
   */
  @action public async getnep5balanceofaddress() {
    let result: any = [];
    try {
      result = await Api.getnep5balanceofaddress(this.address);
      if (!result) {
        this.cgasBalance = '0';
        return false;
      }
    } catch (e) {
      console.log(e)
      this.cgasBalance = '0';
      return false;
    }
    this.cgasBalance = Neo.Fixed8.parse(result[0].nep5balance).toString();
    return true;
  }
  /**
   * 获取账户中的cgas
   */
  @action public async getregisteraddressbalance() {
    let result: any = [];
    try {
      result = await Api.getregisteraddressbalance(this.address);
      if (!result) {
        this.accountBalance = '0';
        return false;
      }
    } catch (e) {
      console.log(e)
      this.accountBalance = '0';
      return false;
    }
    this.accountBalance = Neo.Fixed8.parse(result[0].balance).toString();
    return true;
  }

  @action public sendrawtransaction = async (toHex: string) => {
    let result: any = null;
    try {
      console.log("===========================sendrawtransaction DATA=======================");
      console.log(toHex);

      result = await Api.sendrawtransaction(toHex);
    } catch (e) {
      console.log("===========================sendrawtransaction ERROR=======================");
      console.log(e);

      return false;
    }
    if (!result[0].txid) {
      console.log("===========================sendrawtransaction FALSE=======================");
      console.log(result);

      return false;
    }
    console.log("===========================sendrawtransaction SUCCESS=======================");
    console.log(result[0]);

    return result[0];
  }

  @action public rechargeAndTransfer = async (data1: Uint8Array, data2: Uint8Array) => {
    let result: any = null;
    try {
      result = await Api.rechargeAndTransfer(data1.toHexString(), data2.toHexString());
    }
    catch (e) {
      return false;
    }
    if (!result[0]) {
      return false;
    }
    return result[0];
  }

  /**
   * @method hasTx 查询交易结果
   * @param txid 交易id
   */
  public hasTx = async (txid: string) => {
    const result = await Api.hasTx(txid);
    return result[0];
  }

  /**
   * @method hasConact 查询合约结果
   * @param txid 交易id
   */
  public hasContract = async (txid: string) => {
    const result = await Api.hasContract(txid);
    return result[0]
  }

  /**
   * @method getRehargeAndTransfer 查询合并交易结果
   * @param txid 交易id 
   */
  public getRehargeAndTransfer = async (txid: string) => {
    const result = await Api.getRehargeAndTransfer(txid);
    return result[0]
  }


}

// 外部使用require
export default new Common();
