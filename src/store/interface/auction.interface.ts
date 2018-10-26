import { formatUnixTime } from "@/utils/formatTime";
import { accDiv, accSub, accMul } from "@/utils/alculator";

export interface IAuction {    
    auctionId: string;              // 竞拍会id
    domain: string;                 // 二级域名 string
    parenthash: string;             // 父域名 hash
    fulldomain: string;             // 全域名 string
    domainTTL: string;              // 域名结束时间 TTL (占时别使用)
    auctionState: AuctionState;     // 域名竞拍状态
    startTime: IBlockTime;           // 竞拍开始时间 BlockTime
    startAddress: string;           // 开标地址
    maxPrice: number;               // 最大竞标出价
    maxBuyer: string;               // 最大出价者
    endTime: IBlockTime;             // 结束时间 (五天后自动结束则为空)
    endAddress: string;             // 结束地址 (五天后自动结束则为空)
    lastTime: IBlockTime;            // 最后出价时间
    addwholist: IAuctionAddress[];   // 加价地址类列表
    addWho: IAuctionAddress;
  } 

export interface IAuctionListStore {
    auctionList:{[auctionId:string]:IAuction},
    filterAuctionList:{[auctionId:string]:IAuction},
    viewAuctionList:IAuction[],
    getAuctionInfoByAddress:(address:string)=>void,
    updateAuctionList:()=>void,
}

export interface IAuctionListProps{
    myauction:IAuctionListStore
}

/**
 * 竞拍状态枚举类
 */
export enum AuctionState
{
    watting = '0001', // 等待期
    open = '0101',    // 开标期 //开标后的等待交易确认阶段
    fixed = '0201',   // 确定期
    random = '0301',  // 随机期
    end = '0401',     // 结束期
    pass = '0501',    // 流标期
    expire = '0601',  // 过期期
}

/**
 * 区块时间类
 */
export interface IBlockTime
{
    blockindex: number; // 区块高度
    blocktime: number;  // 区块时间戳
    txid: string;       // 交易id
}

/**
 * 加价地址类
 */
export interface IAuctionAddress
{
    address: string;            // 出价地址
    totalValue: number;         // 累计出价金额
    lastTime: IBlockTime;       // 最后交易的时间
    accountTime: IBlockTime;    // 退币的时间
    getdomainTime: IBlockTime;  // 获得域名的时间
    addpricelist: IBlockTime;   // 加价类列表
}

/**
 * 时间轴类
 */
export class Process
{
    public static getProcess(auction:IAuction,day:number)
    {        
        const process = new Process(auction.startTime.blocktime,day);
        const starttime =formatUnixTime(auction.startTime.blocktime);
        const endtime = (auction.endTime&&auction.endTime.blocktime>0)?formatUnixTime(auction.endTime.blocktime):new Date().getTime();    
        const oldtime = accSub(endtime, starttime);    
        let a: number = 0;
        if (auction.auctionState === AuctionState.fixed)
        {
            process.state = AuctionState.fixed;
            a = accDiv(oldtime, 3 * day);
            process.timearr.length = 4;
        }
        else if (auction.auctionState === AuctionState.random)
        {
            process.state = AuctionState.random;
            a = accDiv(oldtime, 5 * day);
            process.timearr.length = 6;
        } 
        else
        {
            process.state = AuctionState.end;
            const subtime = accSub(formatUnixTime(auction.addWho.lastTime.blocktime), auction.startTime.blocktime);
            if (subtime < 2 * day)  // 判断第三天有无出价
            {
                a = accDiv(oldtime, 3 * day);
                process.timearr.length = 4;
            } else
            {
                a = accDiv(oldtime, 5 * day);
                process.timearr.length = 6;
            }
        }
        // tslint:disable-next-line:prefer-for-of
        for (let n = 0; n < process.timearr.length; n++) {
            const time = process.timearr[n];
            if(time.time<endtime)
            {
                process.timearr[n].active=true;
            }
        }
        const width = a >= 1 ? 100 : accMul(a, 100);
        process.width = parseFloat(width.toFixed(2));
        return process;
    }

    public timearr: Array<{
        time: number;
        active:boolean;
    }>;
    public state: AuctionState;
    public width: number;

    constructor(start: number, day: number)
    {
        this.timearr = [];
        this.width = 0;
        for (let i = 0; i <= 5; i++)
        {
            this.timearr.push({time:formatUnixTime(start)+day*i,active:false});
        }
    }
}