import { observable, action } from 'mobx';
import common from '@/store/common';
import { IBindDomainStore, IBindList } from '../interface/index.interface';
import * as Api from '../api/bind.api';

class BindDomain implements IBindDomainStore
{
    @observable public bindDomain: string = '';
    @observable public bindList: IBindList[] = [];
    //   @observable public bindListCount:number = 0;
    @observable public isLast: boolean = false;
    @observable public isLoading: boolean = false;
    @observable public pageIndex: number = 1;
    @observable public pageSize: number = 10;


    @action public async getBindDomain()
    {
        let result: any = [];
        try
        {
            result = await Api.getBindDomainname(common.address);
        } catch (e)
        {
            this.bindDomain = '';
            return false;
        }
        console.log(result);
        this.bindDomain = result[0].fulldomain;
        return true;
    }

    @action public async getBindDomainList( str?: string)
    {
        // 如果是last 或者 上一条还在加载中 就 return
        if (this.isLast || this.isLoading)
        {
            return true;
        }
        // 设置正在加载中
        this.isLoading = true;
        let result: any = [];
        try
        {
            result = await Api.getBindDomainList(common.address, this.pageIndex, this.pageSize, str);
        } catch (e)
        {
            // 报错 了统一认为到底部了
            this.isLast = true;
            return false;
        } finally
        {
            // 加载完成 后 把 值设置成 false
            this.isLoading = false;
        }

        const list = result ? result[0].list : [];
        // 如果加载到的没结果了，认为是 last 最后一页了
        if (list.length === 0)
        {
            this.isLast = true;
        }
        this.bindList.push(...list)
        return true;
    }
}



export default new BindDomain();