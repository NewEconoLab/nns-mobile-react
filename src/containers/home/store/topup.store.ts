import {observable, autorun} from 'mobx';
import {ITopupStore, InputModule} from '../interface/topup.interface';
import commonStore from '@/store/common';
import { toNonExponential } from 'utils/function';
class Topup implements ITopupStore {
  @observable public fee:number = 0;
  @observable public inputModule:InputModule = {
      inputValue: "",
			status: "",
			message: "",
			color: ""
  }
  constructor() {
    autorun(() => {
      // 当inputValue 发生改变 自动执行
      if(this.inputModule.inputValue) {
        // 重置默认值
        this.inputModule.status = '';
        this.inputModule.color = '';  
        // 计算费率，显示所需数量  目前费率是 0
        const result:number = parseFloat(this.inputModule.inputValue) + parseFloat(this.inputModule.inputValue) * this.fee;
        this.inputModule.message = '所需CGAS数量：' + toNonExponential(result);
        // 如果 输入的大于 余额， 报错
        if(parseFloat(this.inputModule.inputValue) > parseFloat(commonStore.cgasBalance)) {
          this.inputModule.message = '余额不足';
          this.inputModule.color = 'red-color';
        }
      }
    })
  }
}


export default new Topup();