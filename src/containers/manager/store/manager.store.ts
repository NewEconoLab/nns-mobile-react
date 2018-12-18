import { observable, action, computed } from 'mobx';
import * as Api from '../api/manager.api';
import { IManagerList, IManagerStore } from '../interface/index.interface';

class manager implements IManagerStore {
  @observable public chooseStatus: string = '0'; // 记录上一个筛选
  @observable public clickSellStatus: string = '0'; // 点击筛选的值
  @observable public modal: boolean = false; // 是否显示筛选
  @observable public domainList: IManagerList[] = [];
  @observable public pageIndex: number = 0;
  @observable public pageSize: number = 10;
  @observable public detail: IManagerList | null = null;
  @observable public myNNCBalance: string = '0';// 可提取的NNC
  @observable public filterDomainList: IManagerList[] = [];
  // @observable public showTransfer:boolean = false; // 显示转让的弹框
  // @observable public showSaleDomain: boolean = false; // 显示出售的弹框
  // @observable public showDelist: boolean = false; // 显示下架的弹筐

  @computed get domainListFroPage() {
    return this.domainList.slice(0, (this.pageIndex + 1) * this.pageSize)
  }

  @action public getdomainbyaddress = async (address: string) => {
    let result: any = null;
    try {
      result = await Api.getdomainbyaddress(address);

    } catch (error) {
      return false;
    }
    console.log(result);
    this.domainList = result ? result : [];
    return true;
  }
  /**
   * 出售域名获取NNC的收益
   * @param address 当前地址
   */
  @action public getNNCfromSellingHash = async (address: string) => {
    let result: any = null;
    try {
      result = await Api.getNNCfromSellingHash(address);

    } catch (error) {
      this.myNNCBalance = '0';
      return false;
    }
    // console.log(result);

    this.myNNCBalance = result ? result[0].balance : '0';
    return true;
  }
}
export default new manager();