import { TABLE_CONFIG } from "@/config";

export class Task
{
    public height: number;
    public confirm: number;
    public taskType:TaskType;
    public confirmType: ConfirmType;
    public txid: string;
    public message: any;
    public state: TaskState;
    public startTime: number;
    constructor(
        taskType:TaskType,
        confirmType: ConfirmType,
        txid: string,
        messgae?
    )
    {
        const count = sessionStorage.getItem(TABLE_CONFIG.blockCount);
        // tslint:disable-next-line:radix
        this.height = count? parseInt(count): 0;
        this.confirm = 0;
        this.txid = txid;
        this.message = messgae;
        this.taskType = taskType;
        this.confirmType = confirmType;
        this.state = TaskState.watting;
        this.confirmType = this.confirmType;
        this.startTime = new Date().getTime();
    }
    public toString()
    {
        return JSON.stringify(this);
    }
}


/**
 * 确认的操作类型
 */
export enum ConfirmType
{
    tranfer,    // 确认交易是否成功
    contract,   // 确认合约是否成功，等待notify
    recharge,   // 双交易的发送 类型
}
/**
 * 任务状态
 */
export enum TaskState
{
    watting,
    success,
    fail,
}

/**
 * 任务类型
 */
export enum TaskType
{
    startAuction,// 开标
    raise,// 资产更新 在tx交易成功后添加资产更新任务，资产更新立即执行
    topup,// 充值
    withdraw,// 退款
    domainRenewal,// 域名续约
    domainMapping,// 域名映射
    domainResovle,// 域名合约地址
    gasToSgas,// gas转sgas
    sgasToGas,// sgas转gas
    collectDomain,// 领取域名
    recoverCgas,// 退回sgas
    ClaimGas,// 领取Gas
    tranfer,// 交易确认 需要签名的任务，涉及资产变动
}

export interface ITaskmanagerStore 
{
    taskList:Task[];
    update:()=>void;
    addTask:(task: Task)=>void;
}   


export interface ITaskmanagerTypeList {
    [txid:string]:Task
}

