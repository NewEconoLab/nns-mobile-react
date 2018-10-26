import { ITaskmanagerStore, Task, TaskType, ConfirmType, TaskState } from "@/store/interface/taskmanager.interface";
import { observable, action } from 'mobx';
import { TABLE_CONFIG } from "@/config";
import { TaskTool } from "@/utils/tasktools";

class TaskManager implements ITaskmanagerStore
{
    // 任务列表
    @observable public taskList: Task[]=[];    
    public confrimConact = 
    {
        [TaskType.raise]:`assetManagement`,
        [TaskType.startAuction]:`startAuction`,
        [TaskType.collectDomain]:`collectDomain`,
        [TaskType.domainMapping]:`setResolverData`,
        [TaskType.domainResovle]:`changeOwnerInfo`,
        [TaskType.domainRenewal]:`changeOwnerInfo`,
    }

    constructor()
    {
        const taskSession = sessionStorage.getItem(TABLE_CONFIG.taskList);
        this.taskList = taskSession?JSON.parse(taskSession):[];
    }

    @action public addTask (task: Task)
    {
        this.taskList = this.taskList?this.taskList:[];
        this.taskList.push(task);
        sessionStorage.setItem(TABLE_CONFIG.taskList,JSON.stringify(this.taskList));
    }
   
    @action public async update()
    {
        if(!this.taskList || this.taskList.length<=0)
        {
            return;
        }
        const reslist = await TaskTool.getResult(this.taskList)
        this.taskList = TaskTool.forConfirm(this.taskList,(task:Task)=>
        {
            const res = reslist[task.txid];
            task.confirm++;
            if(!res)
            {
                return task;
            }
            if(task.confirmType===ConfirmType.tranfer)
            {
                if(res.issucces)
                {
                    task.state = TaskState.success;
                }
            }
            else if(task.confirmType===ConfirmType.recharge)
            {
                switch (res.errCode)
                {
                    case '0000':// 成功
                        task.state = TaskState.success
                        break;
                    case '3001':// 失败
                        task.state = TaskState.fail
                        break;
                    case '3002':// 失败
                        task.state = TaskState.fail;
                        break;
                }
            }
            else
            {
                if (res.vmstate && res.vmstate !== "")
                {
                    if (res.vmstate === "FAULT, BREAK")
                    {
                        task.state = TaskState.fail;
                    }
                    else if (res.displayNameList && res.displayNameList.includes(this.confrimConact[task.taskType]))
                    {
                        task.state = TaskState.success;
                    } else
                    {
                        task.state = TaskState.fail;
                    }
                }
            }
            return task;
        });

        sessionStorage.setItem(TABLE_CONFIG.taskList,JSON.stringify(this.taskList));        
    }
}

// 外部使用require
export default new TaskManager();