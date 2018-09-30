import {observable,action} from 'mobx';
import * as Api from '../api/manager.api';
import {IManagerList, IManagerStore} from '../interface/index.interface';

class manager implements IManagerStore {
  @observable public domainList:IManagerList[] = [];

  @action public  getdomainbyaddress = async()=> {
    let result:any = null;
    try {
      result = await Api.getdomainbyaddress();

    } catch (error) {
      return false;
    }
    this.domainList = result;
    return true;
  }
}
export default new manager();