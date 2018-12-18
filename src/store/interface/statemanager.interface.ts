export interface IStatemanagerStore
{
    getDomainState:string[];
    bidSettlementState:string[];
    setResolverState:string[];
    setResolverDataState:string[];
    renewDomainState:string[];
    getSaleNNCState:string[];
    transferDomainState:string[];
    sellDomainState:string[];
    delistDomainState:string[];
    buyDomainState:string[];

    domainStatePush:(domain:string)=>void;
    domainStateDel:(domain:string)=>void;
    bidSettlementStatePush:(domain:string)=>void;
    bidSettlementStateDel:(domain:string)=>void;
    setResolverStateDel:(domain:string)=>void;
    setResolverDataStateDel:(domain:string)=>void;
    renewDomainStateDel:(domain:string)=>void;
    getSaleNNCStateDel:()=>void;
    transferDomainStateDel:(domain:string)=>void;
    sellDomainStateDel:(domain:string)=>void;
    delistDomainStateDel:(domain:string)=>void;
    buyDomainStateDel:(domain:string)=>void;
}