import { ITaskmanager, Task, TaskType } from "@/store/interface/taskmanager.interface";

export class TaskManager implements ITaskmanager
{
    public taskList: { [type: string]: Task }={};    
    public update()
    {
        this.taskList={};
    };
    public addTask (task: Task, type: TaskType)
    {
        this.taskList={};
    }
}