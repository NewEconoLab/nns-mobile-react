import { Task, TaskState, ConfirmType, TaskType } from "@/store/interface/taskmanager.interface";
import * as Api from '@/store/api/common.api';
import taskmanager from "@/store/taskmanager";
import { TABLE_CONFIG } from "@/config";
// import auctionmanager from "@/store/auctionmanager";
import common from "@/store/common";
import statemanager from "@/store/statemanager";


export class TaskTool
{
    /**
     * 类似 js 数组的 map方法
     * @param tasks Task数组
     * @param call 回调方法
     */
    public static forConfirm(tasks: Task[], call: any)
    {
        const taskarr: Task[] = [];
        for (const task of tasks)
        {
            let tasknew: Task;
            if (task.state === TaskState.watting) 
            {
                tasknew = call(task);
            }
            else
            {
                tasknew = task;
            }
            taskarr.push(tasknew);
        }
        return taskarr;
    }

    /**
     * 循环得到任务返回的结果
     * @param tasks 任务类
     */
    public static getResult = async (tasks: Task[]): Promise<{ [txid: string]: any }> =>
    {
        const ress: { [txid: string]: any } = {};

        // console.time('showColumnInfo')
        for (const task of tasks)
        {
            if (task.state === TaskState.watting) // 判断如果状态是 watting 则查找对应的返回值 
            {
                switch (task.confirmType)
                {
                    case ConfirmType.tranfer:
                        ress[task.txid] = await common.hasTx(task.txid);
                        break;
                    case ConfirmType.contract:
                        ress[task.txid] = await common.hasContract(task.txid);
                        break;
                    default:
                        ress[task.txid] = await common.getRehargeAndTransfer(task.txid);
                        break;
                }
            }
            else  // 如果状态是 成功或者失败就没必要调用api查询返回结果了
            {
                ress[task.txid] = undefined;
            }
        }
        // console.timeEnd('showColumnInfo') // 4757.181ms
        return ress;
    }

    /**
     * 启动任务管理器
     */
    public static start()
    {
        setInterval(
            async () =>
            {
                const height = sessionStorage.getItem(TABLE_CONFIG.blockCount);
                const res = await Api.getBlockCount();

                // tslint:disable-next-line:radix
                const count = res ? parseInt(res[0]["blockcount"] as string) - 1 : 0;
                if (!height) 
                {
                    sessionStorage.setItem(TABLE_CONFIG.blockCount, count + "");
                    taskmanager.update();
                    // auctionmanager.getAuctionInfoByAddress(common.address);
                }
                // tslint:disable-next-line:radix
                else if (count - parseInt(height) > 0)
                {
                    sessionStorage.setItem(TABLE_CONFIG.blockCount, count + "")
                    taskmanager.update();
                    // auctionmanager.updateAuctionList();
                }
            }, 5000)
    }

    public static stateUpdate(task: Task)
    {
        switch (task.taskType)
        {
            case TaskType.collectDomain:
                statemanager.domainStateDel(task.message["domain"]);
                break;
            case TaskType.recoverCgas:
                statemanager.bidSettlementStateDel(task.message["domain"]);
                break;
            case TaskType.domainRenewal:
                statemanager.renewDomainStateDel(task.message["domain"]);
                break;
            case TaskType.domainResovle:
                statemanager.setResolverStateDel(task.message["domain"]);
                break;
            case TaskType.domainMapping:
                statemanager.setResolverDataStateDel(task.message["domain"]);
                break;
            case TaskType.domainTransfer:
                statemanager.transferDomainStateDel(task.message["domain"]);
                break;
            case TaskType.saleDomain:
                statemanager.sellDomainStateDel(task.message["domain"]);
                break;
            case TaskType.unSaleDomain:
                statemanager.delistDomainStateDel(task.message["domain"]);
                break;
            case TaskType.buyDomain:
                statemanager.buyDomainStateDel(task.message["domain"]);
                break;
            case TaskType.getMyNNC:
                statemanager.getSaleNNCStateDel();
                break;
            case TaskType.bindDoamin:
                statemanager.bindDomainStateDel(task.message["domain"]);
                break;
            case TaskType.delBindDomain:
                statemanager.delBindDomainStateDel(task.message["domain"]);
                break;
            default:
                break;
        }
    }

}