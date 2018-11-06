import { observable, autorun, action } from 'mobx';
import { IHomeStore, InputModule, IMessages } from '../interface/home.interface';
import * as Api from '../api/home.api';
import { IAuction, IAuctionAddress } from '@/store/interface/auction.interface';
import common from '@/store/common';
import DomainSelling from '@/store/DomainSelling';
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

  @observable public auctionInfo:IAuction;

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
        this.getAuctionState();
      }     
    })
  }
  // 域名开拍状态

  @action public async getAuctionState() {
    let result: any = null;
    try {
      result = await Api.getdomainauctioninfo(this.inputModule.inputValue?this.inputModule.inputValue+"."+DomainSelling.RootNeo.root:"");
      if(!result)
      {
        this.inputModule.message = this.messages.successmsg;
        this.inputModule.color = '';
        this.inputModule.status = 'success';
        this.isStatus = 1;
        return true;
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
    }

    this.auctionInfo = result[0];
    if(this.auctionInfo.auctionState==='0201'||this.auctionInfo.auctionState==="0301")
    {
      this.inputModule.message = this.messages.successmsg2;
      this.inputModule.color = '';
      this.inputModule.status = 'success';
      this.isStatus = 2;
      this.auctionInfo.addWho = this.auctionInfo.addWho?this.auctionInfo.addWho:{address:common.address,totalValue:0} as IAuctionAddress
    }
    else if(this.auctionInfo.auctionState==='0401')
    {
      this.inputModule.message = this.messages.errmsg2;
      this.inputModule.color = 'red-color';
      this.inputModule.status = 'error';
      this.isStatus = 0;
    }
    else
    {
      this.inputModule.message = this.messages.successmsg;
      this.inputModule.color = '';
      this.inputModule.status = 'success';
      this.isStatus = 1;
    }
    return true;
  }

}
// 外部使用require
export default new Home();
