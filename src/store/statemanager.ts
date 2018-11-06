import { IStatemanagerStore} from "@/store/interface/statemanager.interface";
import { observable, action } from 'mobx';

class StateManager implements IStatemanagerStore
{
    @observable public setResolverState: string[] = [];

    @observable public setResolverDataState: string[] = [];

    @observable public renewDomainState: string[] = []
    // 领取中的域名id数组
    @observable public getDomainState: string[] = [];    
    // 退回中的域名id数组
    @observable public bidSettlementState: string[] = [];

    @action public domainStatePush = (domain:string) =>{
        this.getDomainState.push(domain);        
    }
    @action public bidSettlementStatePush= (domain:string) => {
        this.bidSettlementState.push(domain);
    }
    @action public domainStateDel= (domain:string) => {
        this.getDomainState = this.deleteState(this.getDomainState,domain);
    }
    @action public bidSettlementStateDel= (domain:string) => {
        this.bidSettlementState = this.deleteState(this.bidSettlementState,domain);
    }
    
    @action public setResolverStateDel = (domain: string) => {
        this.setResolverState = this.deleteState(this.setResolverState,domain)
    }
    @action public setResolverDataStateDel = (domain: string) => {
        this.setResolverDataState = this.deleteState(this.setResolverDataState,domain);
    }
    @action public renewDomainStateDel = (domain: string) => {
        this.renewDomainState = this.deleteState(this.renewDomainState,domain);
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