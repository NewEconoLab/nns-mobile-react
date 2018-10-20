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
      // 初始化
      this.inputModule.message = '';
      this.inputModule.status = '';
      this.inputModule.color = '';
      // 校验域名输入
      if (this.inputModule.inputValue && !/^([A-Z]|[a-z]|[0-9]){2,32}$/g.test(this.inputModule.inputValue)) {
        this.inputModule.message = this.messages.errmsg1;
        this.inputModule.status = 'error';
        this.inputModule.color = 'red-color';
        return;
      }
      // 输入即发送请求
      if(this.inputModule.inputValue){
        this.getauctionstate();
      }     
    })
  }
  // 域名开拍状态
  @action public getauctionstate = async () => {
    let result: any = null;
    try {
      result = await Api.getdomainauctioninfo(this.inputModule.inputValue + '.neo');
      if(!result) 
      {throw new Error("no data");
      }
    } catch (e) {
      if(!this.inputModule.inputValue) {
        return false;
      }
      // 如果报错，表示数据请求异常，无法开拍
      this.inputModule.message = this.messages.successmsg;
      this.inputModule.color = '';
      this.inputModule.status = 'success';
      this.isStatus = 0;
      return false;
    }
    switch(result[0].auctionState){
      // 竞拍状态 0 默认不可竞拍， 1 未开拍， 2 正在竞拍
      case '0101': // 开拍
        this.inputModule.message = this.messages.successmsg2;
        this.inputModule.color = '';
        this.inputModule.status = 'success';
        this.isStatus = 2;
        break;
      case '0201': // 确定期
        this.inputModule.message = this.messages.successmsg2;
        this.inputModule.color = '';
        this.inputModule.status = 'success';
        this.isStatus = 2;
        break;
      case '0301': // 随机期
        this.inputModule.message = this.messages.successmsg2;
        this.inputModule.color = '';
        this.inputModule.status = 'success';
        this.isStatus = 2;
        break;
      case '0401': // 结束期
        this.inputModule.message = this.messages.errmsg2;
        this.inputModule.color = 'red-color';
        this.inputModule.status = 'error';
        this.isStatus = 0;
        return false;
        break;
      case '0501': // 流拍
        this.inputModule.message = this.messages.successmsg;
        this.inputModule.color = '';
        this.inputModule.status = 'success';
        this.isStatus = 1;
        break;
      case '0601': // 过期
        this.inputModule.message = this.messages.successmsg;
        this.inputModule.color = '';
        this.inputModule.status = 'success';
        this.isStatus = 1;
        break;
      case '0701': // 未开标
        this.inputModule.message = this.messages.successmsg;
        this.inputModule.color = '';
        this.inputModule.status = 'success';
        this.isStatus = 1;
        break;      
    }
    return true;
  }

}
// 外部使用require
export default new Home();
