import { ITaskmanagerStore, Task } from "@/store/interface/taskmanager.interface";

export interface IRecordProps {
  taskmanager:ITaskmanagerStore,
  intl:any
}

export interface IRecordState {
  list:Task[]
}

export interface IRecordListProps {
  item:Task,
  intl:any
}

export interface IRecordListState {
  clodTime:number,
  noSetTime:boolean
}