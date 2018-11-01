import { ITaskmanagerStore, Task, TaskType, ConfirmType, TaskState } from "@/store/interface/taskmanager.interface";
import { observable, action } from 'mobx';
import { TABLE_CONFIG } from "@/config";
import { TaskTool } from "@/utils/tasktools";

class TaskManager implements ITaskmanagerStore
{
    // 任务列表
    @observable public taskList: Task[]=[];
    @observable public pendingList:string[] = [];   
    @observable public timer:NodeJS.Timer | null = null; 
    @observable public selfTask:Task | null = null;
    public confrimConact = 
    {
        [TaskType.raise]:`raise`,
        [TaskType.recoverCgas]:`bidSettlement`,
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
        this.pendingList = this.taskList.filter((v:Task )=> v.state === 0).map((v:Task) => v.txid)
    }
    @action public renderNotice = () => {
        this.taskList.forEach((item:Task) => {
            if(this.pendingList.includes(item.txid)) {
              // 这里的判断是为了让 notice 组件 维持单例模式
              if(this.timer) {
                clearTimeout(this.timer);
              }
      
              this.timer = setTimeout(() => {
                 this.selfTask = null;
              }, 5000)

              this.selfTask = item;
            }
          })
          this.pendingList = this.taskList.filter((v:Task )=> v.state === 0).map((v:Task) => v.txid)
    }
    @action public addTask (task: Task)
    {
        this.taskList = this.taskList?this.taskList:[];
        this.taskList.push(task);
        sessionStorage.setItem(TABLE_CONFIG.taskList,JSON.stringify(this.taskList));
        // 操作 tasklist 执行下 renderNotice  用来触发 顶部提示
        this.renderNotice();
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
        // 操作 tasklist 执行下 renderNotice  用来触发 顶部提示
        this.renderNotice();
    }
}

// 外部使用require
export default new TaskManager();