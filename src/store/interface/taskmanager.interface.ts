
export class Task
{
    public height: number;
    public confirm: number;
    public type: ConfirmType;
    public txid: string;
    public message: any;
    public state: TaskState;
    public startTime: number;
    constructor(
        type: ConfirmType,
        txid: string,
        messgae?
    )
    {
        const count = sessionStorage.getItem("block");
        // tslint:disable-next-line:radix
        this.height = count? parseInt(count): 0;
        this.type = type;
        this.confirm = 0;
        this.txid = txid;
        this.state = TaskState.watting;
        this.message = messgae;
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

export interface ITaskmanager 
{
    taskList:{[type:string]:Task}
    update:()=>void
}