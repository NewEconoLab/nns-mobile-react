import {IAuction, AuctionState} from '@/store/interface/auction.interface';
import { formatUnixTime } from "@/utils/formatTime";
import { accDiv, accSub, accMul } from "@/utils/alculator";
/**
 * 时间轴类
 */
export default class Process
{
    public static getProcess(auction:IAuction,day:number)
    {        
        const process = new Process(auction.startTime.blocktime,day);
        const starttime =formatUnixTime(auction.startTime.blocktime.toString());
        const endtime = (auction.endTime&&auction.endTime.blocktime>0)?formatUnixTime(auction.endTime.blocktime.toString()):new Date().getTime();    
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
            const subtime = accSub(formatUnixTime(auction.addWho.lastTime.blocktime.toString()), formatUnixTime(auction.startTime.blocktime.toString()));
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
            this.timearr.push({time:formatUnixTime(start.toString())+day*i,active:false});
        }
    }
}