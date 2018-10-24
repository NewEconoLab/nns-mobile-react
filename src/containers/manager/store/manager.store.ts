import {observable,action} from 'mobx';
import * as Api from '../api/manager.api';
import {IManagerList, IManagerStore} from '../interface/index.interface';

class manager implements IManagerStore {
  @observable public domainList:IManagerList[] = [];
  @observable public detail:IManagerList | null = null;

  @action public  getdomainbyaddress = async(address:string)=> {
    let result:any = null;
    try {
      result = await Api.getdomainbyaddress(address);

    } catch (error) {
      return false;
    }
    this.domainList = result?result:[];
    return true;
  }
}
export default new manager();