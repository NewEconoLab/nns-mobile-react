import {observable, action} from 'mobx';
import * as Api from '@/store/api/domain.api';
import { IAuctionListManager, IAuction, AuctionState, IAuctionAddress } from './interface/auction.interface';
import common from './common';
import { TABLE_CONFIG } from '@/config';

class AuctionManager implements IAuctionListManager {
 @observable public auctionList:{[auctionId:string]:IAuction} = {};

 @action public getAuctionInfoByAddress = async (address:string) => {
   let result:any = null;
   
   try {
    result = await Api.getauctioninfobyaddress(address, 1, 100);
    
   }catch(e) {
     return false;
   }
   const list:IAuction[] = result[0].list;
   for (const auction of list) {
     this.auctionList[auction.auctionId] = auction;
   }

   sessionStorage.setItem(TABLE_CONFIG.auctionList,JSON.stringify(this.auctionList));
   return true;
 }
 @action public async updateAuctionList()
 {
   const ids: string[] = [];
   for (const auctionId in this.auctionList) {
     if (this.auctionList.hasOwnProperty(auctionId)) {
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
   console.log(ids);
   
   const result = await Api.getAuctionInfoByAucitonid(common.address, ids, ".neo");
   console.log(result);
   
   if (result)
   {
     console.log("============================="+result);
     
       const list = result[ 0 ].list as IAuction[];
       console.log(list);
       
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

}

export default new AuctionManager();