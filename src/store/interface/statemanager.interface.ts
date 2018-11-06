export interface IStatemanagerStore
{
    getDomainState:string[];
    bidSettlementState:string[];
    setResolverState:string[];
    setResolverDataState:string[];
    renewDomainState:string[];

    domainStatePush:(domain:string)=>void;
    domainStateDel:(domain:string)=>void;
    bidSettlementStatePush:(domain:string)=>void;
    bidSettlementStateDel:(domain:string)=>void;
    setResolverStateDel:(domain:string)=>void;
    setResolverDataStateDel:(domain:string)=>void;
    renewDomainStateDel:(domain:string)=>void;
}