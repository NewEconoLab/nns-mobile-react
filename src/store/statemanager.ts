import { IStatemanagerStore} from "@/store/interface/statemanager.interface";
import { observable, action } from 'mobx';

class StateManager implements IStatemanagerStore
{
    // 设置地址解析器
    @observable public setResolverState: string[] = [];
    // 地址映射
    @observable public setResolverDataState: string[] = [];
    // 续约
    @observable public renewDomainState: string[] = []
    // 领取中的域名id数组
    @observable public getDomainState: string[] = [];    
    // 退回中的域名id数组
    @observable public bidSettlementState: string[] = [];
    // 获取收益的nnc
    @observable public getSaleNNCState:boolean = false;
    // 域名转让
    @observable public transferDomainState:string[] = [];
    // 出售域名
    @observable public sellDomainState:string[] = [];
    // 域名下架
    @observable public delistDomainState:string[] = [];
    // 域名购买
    @observable public buyDomainState:string[] = [];

    // 域名竞拍
    @action public domainStatePush = (domain:string) =>{
        this.getDomainState.push(domain);        
    }
    // 退回竞拍金
    @action public bidSettlementStatePush= (domain:string) => {
        this.bidSettlementState.push(domain);
    }
    // 更新领取域名状态
    @action public domainStateDel= (domain:string) => {
        this.getDomainState = this.deleteState(this.getDomainState,domain);
    }
    // 更新领会竞拍金状态
    @action public bidSettlementStateDel= (domain:string) => {
        this.bidSettlementState = this.deleteState(this.bidSettlementState,domain);
    }
    // 更新设置地址解析器状态
    @action public setResolverStateDel = (domain: string) => {
        this.setResolverState = this.deleteState(this.setResolverState,domain)
    }
    // 更新地址映射状态
    @action public setResolverDataStateDel = (domain: string) => {
        this.setResolverDataState = this.deleteState(this.setResolverDataState,domain);
    }
    // 更新续约状态
    @action public renewDomainStateDel = (domain: string) => {
        this.renewDomainState = this.deleteState(this.renewDomainState,domain);
    }
    // 更新NNC收益
    @action public getSaleNNCStateDel = () => {
        this.getSaleNNCState = false;
    }
    // 更新转让状态
    @action public transferDomainStateDel = (domain: string) => {
        this.transferDomainState = this.deleteState(this.transferDomainState,domain);
    }
    // 更新域名出售状态
    @action public sellDomainStateDel = (domain: string) => {
        this.sellDomainState = this.deleteState(this.sellDomainState,domain);
    }
    // 更新域名下架状态
    @action public delistDomainStateDel = (domain: string) => {
        this.delistDomainState = this.deleteState(this.delistDomainState,domain);
    }
    // 更新域名购买状态
    @action public buyDomainStateDel = (domain: string) => {
        this.buyDomainState = this.deleteState(this.buyDomainState,domain);
    }
    public deleteState(arr:string[],str:string)
    {   
        const newarr:string[] = [];
        for (const state of arr) {
            if(str!==state){
                newarr.push(state);
            }
        }
        return newarr;
    }

}

// 外部使用require
export default new StateManager();