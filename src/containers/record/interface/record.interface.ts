import { ITaskmanagerStore, Task } from "@/store/interface/taskmanager.interface";

export interface IRecordProps {
  taskmanager:ITaskmanagerStore
}

export interface IRecordState {
  list:Task[]
}

export interface IRecordListProps {
  item:Task
}

export interface IRecordListState {
  clodTime:number,
  noSetTime:boolean
}