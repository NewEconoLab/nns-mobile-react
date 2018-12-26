import { observable, autorun, action } from 'mobx';
import { IHomeStore, InputModule, IMessages, ISaleDomainInfo, IRechargeResult } from '../interface/home.interface';
import * as Api from '../api/home.api';
import { IAuction, IAuctionAddress, AuctionState } from '@/store/interface/auction.interface';
import common from '@/store/common';
import DomainSelling from '@/store/DomainSelling';
import { HASH_CONFIG } from "@/config";
class Home implements IHomeStore
{
  @observable public inputModule: InputModule = {
    inputValue: "",
    status: "",
    message: "",
    color: ""
  }
  @observable public messages: IMessages = {
    errmsg1: '',
    errmsg2: '',
    successmsg: '',
    successmsg2: '',
    successmsg3: ''
  }
  // 竞拍状态 0 默认活着不可用(已结束)，1 未使用（可开拍），2 正在竞拍(可加价),3 可购买,4为开标中
  @observable public isStatus: number = 0;

  @observable public auctionInfo: IAuction;
  @observable public sellingDomain: ISaleDomainInfo | null = null;
  @observable public isOKBuy: boolean = false; // 购买按钮 默认不可购买
  @observable public isShowSaleBox:boolean = false; // 购买弹筐
  @observable public reChargeResult:IRechargeResult|null = null;
  constructor()
  {
    autorun(() =>
    {
      // 初始化
      this.inputModule.message = '';
      this.inputModule.status = '';
      this.inputModule.color = '';
      // 校验域名输入
      if (this.inputModule.inputValue && !/^([A-Z]|[a-z]|[0-9]){2,32}$/g.test(this.inputModule.inputValue))
      {
        this.inputModule.message = this.messages.errmsg1;
        this.inputModule.status = 'error';
        this.inputModule.color = 'red-color';
        return;
      }
      // 输入即发送请求
      if (this.inputModule.inputValue)
      {
        this.getAuctionState();
      }
    })
  }
  // 域名开拍状态

  @action public async getAuctionState()
  {
    let result: any = null;
    try
    {
      result = await Api.getdomainstate(this.inputModule.inputValue ? this.inputModule.inputValue + "." + DomainSelling.RootNeo.root : "");
      if (!result)
      {
        this.inputModule.message = this.messages.successmsg;
        this.inputModule.color = '';
        this.inputModule.status = 'success';
        this.isStatus = 1;
        return true;
      }
    } catch (e)
    {
      if (!this.inputModule.inputValue)
      {
        return false;
      }
      // 如果报错，表示数据请求异常，无法开拍
      this.inputModule.message = this.messages.successmsg;
      this.inputModule.color = '';
      this.inputModule.status = 'success';
      this.isStatus = 0;
    }
    console.log("search domain")
    console.log(result[0]);
    // 竞拍状态 0 默认活着不可用(已结束)，1 未使用（可开拍），2 正在竞拍(可加价),3 可购买，4为开标中
    switch (result[0].state)
    {
      case AuctionState.watting: // 4为开标中
        this.inputModule.message = this.messages.successmsg;
        this.inputModule.color = '';
        this.inputModule.status = 'success';
        this.isStatus = 4;
        break;
      case AuctionState.end: // 0 默认活着不可用(已结束
        this.inputModule.message = this.messages.errmsg2;
        this.inputModule.color = 'red-color';
        this.inputModule.status = 'error';
        this.isStatus = 0;
        break;
      case AuctionState.random: // 2 正在竞拍(可加价)
        this.inputModule.message = this.messages.successmsg2;
        this.inputModule.color = '';
        this.inputModule.status = 'success';
        this.isStatus = 2;
        break;
      case AuctionState.fixed: // 2 正在竞拍(可加价)
        this.inputModule.message = this.messages.successmsg2;
        this.inputModule.color = '';
        this.inputModule.status = 'success';
        this.isStatus = 2;
        break;
      case AuctionState.sale: // 3 可购买
        this.inputModule.message = this.messages.successmsg3;
        this.inputModule.color = '';
        this.inputModule.status = 'success';
        this.isStatus = 3;
        break;
      case AuctionState.open: // 1 未使用（可开拍）
        this.inputModule.message = this.messages.successmsg;
        this.inputModule.color = '';
        this.inputModule.status = 'success';
        this.isStatus = 1;
        break;
      case AuctionState.pass:
        this.inputModule.message = this.messages.successmsg;
        this.inputModule.color = '';
        this.inputModule.status = 'success';
        this.isStatus = 1;
        break;
      case AuctionState.expire:
        this.inputModule.message = this.messages.successmsg;
        this.inputModule.color = '';
        this.inputModule.status = 'success';
        this.isStatus = 1;
        break;
      case AuctionState.old:
        this.inputModule.message = this.messages.successmsg;
        this.inputModule.color = '';
        this.inputModule.status = 'success';
        this.isStatus = 1;
        break;
      default:
        break;
    }
    return true;
  }
  /**
   * 获取正在竞拍的域名的详情
   */
  @action public async getAuctionInfo()
  {
    let result: any = null;
    try
    {
      result = await Api.getdomainauctioninfo(this.inputModule.inputValue ? this.inputModule.inputValue + "." + DomainSelling.RootNeo.root : "");
      if (!result)
      {
        this.auctionInfo = result[0];
        return true;
      }
    } catch (e)
    {
      return false
    }
    this.auctionInfo = result[0];
    if (this.auctionInfo.auctionState === '0201' || this.auctionInfo.auctionState === "0301")
    {
      this.auctionInfo.addWho = this.auctionInfo.addWho ? this.auctionInfo.addWho : { address: common.address, totalValue: 0 } as IAuctionAddress
    }
    return true
  }
  /**
   * 查询出售域名的详情
   */
  @action public async getSaleDomainInfo()
  {
    let result: any = null;
    try
    {
      result = await Api.getSaleDomainInfo(this.inputModule.inputValue ? this.inputModule.inputValue + "." + DomainSelling.RootNeo.root : "");
    } catch (error)
    {
      this.sellingDomain = null;
      return error;
    }
    this.sellingDomain = result ? result[0] : null;
    return true;
  }
  /**
   * 查询当前地址的NNC资产
   */
  @action public async getnep5balanceofaddress()
  {
    let result: any = null;
    try
    {
      result = await Api.getnep5balanceofaddress(HASH_CONFIG.ID_NNC.toString(), common.address);
    } catch (error)
    {
      this.isOKBuy = false; 
      return error;
    }
    
    if (this.sellingDomain && result)
    {
      const salePrice = parseFloat(this.sellingDomain.price);
      const nnc = parseFloat(result[0].nep5balance);
      if (salePrice > nnc)// 钱不够
      {
        this.isOKBuy = false;
      } else // 钱够
      {
        this.isOKBuy = true;
      }
    }
    else // 没有钱
    {
      this.isOKBuy = false;
    }
    return true;
  }
  /**
   * 两笔交易提交给服务器发送
   * @param data1 第一笔交易数据
   * @param data2 第二笔交易数据
   */
  @action public async reChargeandtransfer(data1: Uint8Array, data2: Uint8Array)
  {
    let result: any = null;
    try
    {
      result = await Api.rechargeandtransfer(data1,data2);
    } catch (error)
    {
      this.reChargeResult = null;
      return error;
    }
    this.reChargeResult = result[0]||null;  
    return result;
  }
}
// 外部使用require
export default new Home();
