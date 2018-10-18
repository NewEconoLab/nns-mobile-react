import { ITaskmanager, Task, TaskType } from "@/store/interface/taskmanager.interface";
import * as Api from '@/store/api/common.api';
import { observable, action } from 'mobx';
import { TABLE_CONFIG } from "@/config";

class TaskManager implements ITaskmanager
{
    // 任务列表
    @observable public taskList: { [type: number]: Task };    

    constructor()
    {
        const taskSession = sessionStorage.getItem(TABLE_CONFIG.taskList);
        this.taskList = taskSession?JSON.parse(taskSession):{};
    }

    @action public addTask (task: Task, type: TaskType)
    {
        this.taskList[type]=task;
        sessionStorage.setItem(TABLE_CONFIG.taskList,JSON.stringify(this.taskList));
    }
   
    @action public async update()
    {
        console.log("============进入了任务管理器，开始循环");
        const height = sessionStorage.getItem(TABLE_CONFIG.blockCount);
        const res = await Api.getBlockCount();
        // tslint:disable-next-line:radix
        const count = res?parseInt(res[0]["blockcount"] as string)-1 : 0;
        if(!height) 
        {
            sessionStorage.setItem(TABLE_CONFIG.blockCount,count+"");
            this.update();
        }
        // tslint:disable-next-line:radix
        else if(count-parseInt(height)>0)
        {
            sessionStorage.setItem(TABLE_CONFIG.blockCount,count+"")
        }
    }
    
}

// 外部使用require
export default new TaskManager();