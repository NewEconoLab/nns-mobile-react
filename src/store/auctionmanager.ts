import {observable, action} from 'mobx';
import * as Api from '@/store/api/domain.api';
import { IAuctionListStore, IAuction, AuctionState, IAuctionAddress } from './interface/auction.interface';
import common from './common';
import { TABLE_CONFIG } from '@/config';
import DomainSelling from './DomainSelling';

class AuctionManager implements IAuctionListStore {

  @observable public viewAuctionList: IAuction[];
  @observable public auctionList:{[auctionId:string]:IAuction} = {};
  @observable public filterAuctionList:{[auctionId:string]:IAuction} = {};

  @action public initFilterAuctionList = () => 
  {
    const sessionAutionList = sessionStorage.getItem(TABLE_CONFIG.auctionList);
    if(sessionAutionList)
    {
      const auctionList = JSON.parse(sessionAutionList);
      this.auctionList = auctionList;
      this.filterAuctionList = auctionList;
      // 手动排个序
      this.sortFilterAuctionList();
    }
    else
    {
      this.getAuctionInfoByAddress(common.address);
    }
  }
  
  @action public getAuctionInfoByAddress = async (address:string) => 
  {
    const list:IAuction[]=[];
    try 
    {
      const res = await Api.getAuctionInfoCount(address,DomainSelling.RootNeo.root);
      const count = res[0]['count'];
      let count2=count;
      if(count>100)
      {
        for(;count2>0;)
        {
          // const result = await Api.getauctioninfobyaddress(address, 1, count2<100?count2:100,DomainSelling.RootNeo.root);
          // list = list.concat(result?result[0].list:[]);
          count2 -= 100;
        }
      }
      else
      {
        // const result = await Api.getauctioninfobyaddress(address, 1, count,DomainSelling.RootNeo.root);
        // list = list.concat(result?result[0].list:[]);
      }
    }
    catch(e)
    {
      return false;
    }
    for (const auction of list) 
    {
      if (auction.addwholist)
      {
        let who:any;
        for (const addinfo of auction.addwholist)
        {
          who = addinfo.address === common.address?addinfo:undefined;
        }
        auction.addWho = who?who:{address:common.address,totalValue:0}
      }
      else
      {
        auction.addWho = {address:common.address,totalValue:0} as IAuctionAddress
      }
      this.auctionList[auction.auctionId] = auction;
      this.filterAuctionList[auction.auctionId] = auction;
      // 手动排个序
      this.sortFilterAuctionList();
    }    
    sessionStorage.setItem(TABLE_CONFIG.auctionList,JSON.stringify(this.auctionList));
    return true;
  }

  @action public addAuction(auction:IAuction)
  {
    // 因为 用 filterAuctionList 存储 帅选后的状态，这里判断下，更新actionList 的时候，同步更新filterAuctionList
    let isFilter = true;
    if(Object.keys(this.auctionList).length === Object.keys(this.filterAuctionList).length) 
    {
      isFilter = false;
    }
    this.auctionList[auction.auctionId] = auction;
    sessionStorage.setItem(TABLE_CONFIG.auctionList,JSON.stringify(this.auctionList));
    // 同步更新filterAuctionList
    if(!isFilter) 
    {
      this.filterAuctionList = this.auctionList;
      // 手动排个序
      this.sortFilterAuctionList();
    }
  }

  /**
   * 这部分功能之后还要转移，现在是这个方法暂时在这里做更新操作
   */
  @action public async updateAuctionList()
  {
    const ids: string[] = [];
    // 因为 用 filterAuctionList 存储 帅选后的状态，这里判断下，更新actionList 的时候，同步更新filterAuctionList
    let isFilter = true;
    if(Object.keys(this.auctionList).length === Object.keys(this.filterAuctionList).length) 
    {
      isFilter = false;
    }
    for (const auctionId in this.auctionList) 
    {
      if (this.auctionList.hasOwnProperty(auctionId)) 
      {
        const auction = this.auctionList[auctionId];
        if (auction.auctionState === AuctionState.end)
        {
          if (auction.addWho)
          {
            if (auction.maxBuyer === auction.addWho.address)    // 未领取的域名需要更新
            {
              if (!auction.addWho.getdomainTime)
              {
                ids.push(auction.auctionId);
              }
            }
            else                                      // 未退币的域名需要更新
            {
              if (!auction.addWho.accountTime)
              {
                ids.push(auction.auctionId);
              }
            }
          }
        }
        else                                          // 未结束的域名都需要更新
        {
          ids.push(auction.auctionId);
        }
      }
    }
    if(ids.length>0)
    {  // 如果有需要更新的id 则进方法进行更新
      const result = await Api.getAuctionInfoByAucitonid(common.address, ids, '.'+DomainSelling.RootNeo.root);
      if (result)
      {
        const list = result[ 0 ].list as IAuction[];
        for (const auction of list)
        {
          if (auction.auctionState !== AuctionState.pass)
          {
            if (auction.addwholist)
            {
              for (const who of auction.addwholist)
              {
                auction.addWho = who.address === common.address?who:{address:common.address,totalValue:0} as IAuctionAddress;
              }
            }
            this.auctionList[ auction.auctionId ] = auction;
          }
          else
          {
            delete this.auctionList[ auction.auctionId ];
          }
        }
        sessionStorage.setItem(TABLE_CONFIG.auctionList,JSON.stringify(this.auctionList));
      }
    }

    // 同步更新filterAuctionList
    if(!isFilter) 
    {
      this.filterAuctionList = this.auctionList;
      // 手动排个序
      this.sortFilterAuctionList();
    }
  }

  /**
   * 按开标时间排序 
   */
  @action public sortFilterAuctionList = () => {
    let keys = Object.keys(this.filterAuctionList);

    keys = keys.sort((n1, n2) => {
      if(!this.filterAuctionList[n1].startTime || !this.filterAuctionList[n1].startTime.blocktime ) {
        return 1;
      }

      if(!this.filterAuctionList[n2].startTime || !this.filterAuctionList[n2].startTime.blocktime) {
        return 1;
      }
      return this.filterAuctionList[n1].startTime.blocktime < this.filterAuctionList[n2].startTime.blocktime ? 1 : -1;
    });

    const oldList = {...this.filterAuctionList }
    this.filterAuctionList = {};

    keys.forEach((item) => {
      this.filterAuctionList[item] = oldList[item];
    })
  }
}

export default new AuctionManager(); 