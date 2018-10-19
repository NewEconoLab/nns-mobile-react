import {observable} from 'mobx';
// import * as Api from '../api/index.api';
import { IMyAuctionStore} from '../interface/index.interface';
import { IAuction } from '@/store/interface/auction.interface';

class MyAuctuon implements IMyAuctionStore {
 @observable public myBid: string="";
//  @observable public auctionList:IAuctionList[] = [];
 @observable public detail:IAuction | null = null;
 @observable public showDialog:boolean = false;
 @observable public modal:boolean = false;
 @observable public statusValue:string = '0';
 @observable public peopleValue:string = '0';
 @observable public clickStatus:string = '0';
 @observable public clickPeople:string = '0';
//  @action public getauctioninfobyaddress = async (address:string) => {
//    let result:any = null;
//    try {
//     result = await Api.getauctioninfobyaddress(address, 1, 100);
//    }catch(e) {
//      return false;
//    }

//    this.auctionList = result[0].list;
//    return true;
//  }
}

export default new MyAuctuon();