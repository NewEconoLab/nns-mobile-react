import { observable, autorun, action } from 'mobx';
import { IHomeStore, InputModule, IMessages } from '../interface/home.interface';
import * as Api from '../api/home.api';
class Home implements IHomeStore {
  @observable public inputModule: InputModule = {
    inputValue: "",
    status: "",
    message: "",
    color: ""
  }
  @observable public messages:IMessages = {
    errmsg1:'',
    errmsg2:'',
    successmsg:'',
    successmsg2:''
  }
  @observable public isStatus:number = 0; // 竞拍状态 0 默认活着不可用， 1 未使用， 2 正在竞拍

  constructor() {
    autorun(() => {
      this.inputModule.message = '';
      this.inputModule.status = '';
      this.inputModule.color = '';

      if (this.inputModule.inputValue && !/^([A-Z]|[a-z]|[0-9]){6,32}$/g.test(this.inputModule.inputValue)) {
        this.inputModule.message = this.messages.errmsg1;
        this.inputModule.status = 'error';
        this.inputModule.color = 'red-color';
        return;
      }

      this.getauctionstate();

    })
  }

  @action public getauctionstate = async () => {
    let result: any = null;
    try {
      result = await Api.getauctionstate(this.inputModule.inputValue + '.neo');
    } catch (e) {
      if(!this.inputModule.inputValue) {
        return false;
      }
      // 如果报错，表示数据不存在，此域名可用
      this.inputModule.message = this.messages.successmsg;
      this.inputModule.color = '';
      this.inputModule.status = 'success';
      this.isStatus = 1;
      return false;
    }

    // 表示已存在 判断是否结束
    if (result[0].endTime.txid) {
      this.inputModule.message = this.messages.errmsg2;
      this.inputModule.color = 'red-color';
      this.inputModule.status = 'error';
      return false;
    }

    this.inputModule.message = this.messages.successmsg2;
    this.inputModule.color = '';
    this.inputModule.status = 'success';
    this.isStatus = 2;

    return true;
  }

}
// 外部使用require
export default new Home();
