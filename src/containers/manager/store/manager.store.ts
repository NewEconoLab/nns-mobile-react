import { observable, action } from 'mobx';
import * as Api from '../api/manager.api';
import { IManagerList, IManagerStore, IDomainAddress } from '../interface/index.interface';

class manager implements IManagerStore {
  @observable public chooseStatus: string = 'all'; // 记录上一个筛选
  @observable public clickSellStatus: string = 'all'; // 点击筛选的值
  @observable public modal: boolean = false; // 是否显示筛选
  @observable public domainList: IManagerList[] = [];
  @observable public pageIndex: number = 1;
  @observable public pageSize: number = 10;
  @observable public detail: IManagerList | null = null;
  @observable public myNNCBalance: string = '0';// 可提取的NNC
  @observable public filterDomainList: IManagerList[] = [];
  @observable public domainAddress:IDomainAddress|null=null;// 域名映射的地址
  @observable public isLast: boolean = false;// 请求锁，是否为最后请求
  @observable public isLoading: boolean = false; // 加载锁

  // @computed get domainListFroPage() {
  //   return this.filterDomainList.slice(0, (this.pageIndex + 1) * this.pageSize)
  // }

  @action public getdomainbyaddress = async (address: string,search:string) => {
    // 如果是last 或者 上一条还在加载中 就 return
    if (this.isLast || this.isLoading) {
      return true;
    }
    // 设置正在加载中
    this.isLoading = true;
    let result: any = null;
    try {
      result = await Api.getdomainbyaddress(address,this.chooseStatus,this.pageIndex,this.pageSize,search);
    } catch (error) {
      // 报错 了统一认为到底部了
      this.isLast = true;
      return false;
    }finally {
      // 加载完成 后 把 值设置成 false
      this.isLoading = false;
    }
    const list = result ? result[0].list : [];
    // 如果加载到的没结果了，认为是 last 最后一页了
    if (list.length === 0) {
      this.isLast = true;
    }
    // 每次都往里面push
    this.filterDomainList=[...this.filterDomainList,...list];
    console.log(this.filterDomainList.length);   
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
    this.myNNCBalance = result ? result[0].balance : '0';
    return true;
  }
  /**
   * 查询域名映射地址
   * @param domain 域名
   */
  @action public getResolveAddress = async (domain:string) =>{
    let result: any = null;
    try {
      result = await Api.getresolvedaddress(domain);

    } catch (error) {
      this.domainAddress = null;
      return false;
    }
    console.log(result);
    this.domainAddress = result ? result[0] : null;
    return true;
  }
}
export default new manager();