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
    public timearr: Array<{
        msg: string;
        date: string;
        time: string;
    }>;
    public state: AuctionState;
    public startTime: number;
    public width: number;
    public date: string;
    public time: string;

    constructor(start: number | string, day: number)
    {
        this.timearr = [];
        this.startTime = typeof start === "string" ? timetool.currentTime(start) : start as number;
        const startdate = time.getDate(this.startTime);
        this.date = tools.timetool.dateFtt("yyyy/MM/dd", startdate);
        this.time = tools.timetool.dateFtt("hh:mm:ss", startdate);
        this.width = 0;
        for (let i = 1; i <= 5; i++)
        {
            const element = { msg: i.toString(), date: "", time: "" };

            const time = this.startTime + day * i;

            const date = tools.timetool.dateFtt("yyyy/MM/dd", tools.timetool.getDate(time));
            const times = tools.timetool.dateFtt("hh:mm:ss", tools.timetool.getDate(time));
            element.date = date;
            element.time = times;
            this.timearr.push(element);
        }
    }
}