import {observable, action} from 'mobx';
import * as Api from '../api/index.api';
import {IAuctionList, IMyAuctionStore} from '../interface/index.interface';

class MyAuctuon implements IMyAuctionStore {
 @observable public myBid: string="";
 @observable public auctionList:IAuctionList[] = [];
 @observable public detail:IAuctionList | null = null;
 @observable public showDialog:boolean = false;
 @observable public modal:boolean = false;
 @observable public statusValue:string = 'all';
 @observable public peopleValue:string = 'all';
 @observable public clickStatus:string = 'all';
 @observable public clickPeople:string = 'all';
 @action public getauctioninfobyaddress = async (address:string) => {
   let result:any = null;
   try {
<<<<<<< HEAD
    result = await Api.getauctioninfobyaddress(address, 1, 100);
=======
    result = await Api.getauctioninfobyaddress(address, 1, 10);
>>>>>>> bf898e5e67cd69029db73e754fdfc5f8000b5cb3
   }catch(e) {
     return false;
   }

   this.auctionList = result[0].list;
   return true;
 }
}

export default new MyAuctuon();