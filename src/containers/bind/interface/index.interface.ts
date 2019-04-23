import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
import { IStatemanagerStore } from "@/store/interface/statemanager.interface";

export interface IBindDomainStore
{
    bindDomain: string, // 绑定的域名
    bindList: IBindList[], // 可绑定域名列表
    isLast: boolean, // 是否是最后的请求
    isLoading: boolean, // 是否正在请求    
    pageIndex: number, // 当前页码
    pageSize: number, // 每页条数
    getBindDomain: () => Promise<boolean>, // 获取绑定的域名
    getBindDomainList: (str?: string) => Promise<boolean>, // 获取可绑定的域名列表
}

export interface IBindList
{
    fulldomain: string,
    bindflag: string
}

export interface IBindProps extends RouteComponentProps
{
    bind: IBindDomainStore,
    common: ICommonStore,
    intl: any,
    statemanager:IStatemanagerStore,
}