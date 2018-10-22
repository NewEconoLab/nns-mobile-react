import { ITaskmanager, Task, TaskType } from "@/store/interface/taskmanager.interface";
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
   
    @action public update()
    {
        // console.log("---------------------------执行 任务管理器 update方法----------------------");
    }
    
}

// 外部使用require
export default new TaskManager();