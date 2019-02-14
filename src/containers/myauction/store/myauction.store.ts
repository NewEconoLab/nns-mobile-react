import { observable, action } from 'mobx';
import * as Api from '../api/index.api';
import { IMyAuctionStore } from '../interface/index.interface';
import { IAuction, IAuctionAddress } from '@/store/interface/auction.interface';
import DomainSelling from '@/store/DomainSelling';

class MyAuctuon implements IMyAuctionStore
{
  @observable public myBid: string = "";
  //  @observable public auctionList:IAuctionList[] = [];
  @observable public detail: IAuction | null = null;
  @observable public showDialog: boolean = false;
  @observable public modal: boolean = false;
  @observable public statusValue: string = 'all';// 域名竞拍状态,取值0201/0301/0401
  @observable public peopleValue: string = '2';// 出价人，1表示自己，0表示他人
  @observable public clickStatus: string = 'all';// 选择的域名状态
  @observable public clickPeople: string = '2';// 选择的出价人
  @observable public pageIndex: number = 1;
  @observable public pageSize: number = 10;
  @observable public isLast: boolean = false;// 请求锁，是否为最后请求
  @observable public isLoading: boolean = false;// 加载锁
  @observable public filterAuctionList: IAuction[] = [];

  // @action public setDetail = (auction: IAuction) =>
  // {
  //   this.detail = auction;
  // }

  @action public getauctioninfobyaddress = async (address: string, search: string, isSelect?: boolean) =>
  {
    if (!isSelect)
    {
      // 如果是last 或者 上一条还在加载中 就 return
      if (this.isLast || this.isLoading)
      {
        return true;
      }
    }

    // 设置正在加载中
    this.isLoading = true;
    let result: any = null;
    try 
    {
      result = await Api.getauctioninfobyaddress(address, this.pageIndex, this.pageSize, DomainSelling.RootNeo.root, search, this.peopleValue, this.statusValue);
    }
    catch (e)
    {
      // 报错 了统一认为到底部了
      this.isLast = true;
      return false;
    } finally
    {
      // 加载完成 后 把 值设置成 false
      this.isLoading = false;
    }
    const list = result ? result[0].list : [];
    // 如果加载到的没结果了，认为是 last 最后一页了
    if (list.length === 0)
    {
      this.isLast = true;
    }
    for (const auction of list) 
    {
      if (auction.addwholist)
      {
        let who: any;
        for (const addinfo of auction.addwholist)
        {
          who = addinfo.address === address ? addinfo : undefined;
        }
        auction.addWho = who ? who : { address: address, totalValue: 0 }
      }
      else
      {
        auction.addWho = { address: address, totalValue: 0 } as IAuctionAddress
      }
      // this.auctionList[auction.auctionId] = auction;
      this.filterAuctionList.push(auction);
    }
    // sessionStorage.setItem(TABLE_CONFIG.auctionList,JSON.stringify(this.auctionList));
    return true;
  }
}

export default new MyAuctuon();