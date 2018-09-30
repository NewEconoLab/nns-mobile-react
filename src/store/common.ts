// 存储全局变量

import { observable } from 'mobx';
// import {IHomeStore} from '@/containers/home/interface/home.interface';
// import * as Api from '@/containers/home/api/home.api';
class Common{
  @observable public title:string = ''; // 标题
  @observable public language:string = 'cn';  // 当前语言
  @observable public address:string = 'ATBTRWX8v8teMHCvPXovir3Hy92RPnwdEi'; // 当前地址
  @observable public network:string = 'testnet';  // 当前网络
  @observable public accountBalance:string = '';    // 账户中的cgas
  @observable public cgasBalance:string = '';       // CGAS余额

  
}

// 外部使用require
export default new Common();
