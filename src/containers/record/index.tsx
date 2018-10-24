/**
 * 操作记录布局
 */
import * as React from 'react';
import {observer, inject} from 'mobx-react';
import RecordList from './recordlist'
import './index.less'
import { IRecordProps, IRecordState } from './interface/record.interface';
import {ITaskmanagerTypeList, Task} from '@/store/interface/taskmanager.interface';

@inject('taskmanager')
@observer
export default class Record extends React.Component<IRecordProps, IRecordState>
{
  public state = {
    list:[]
  }
  public componentDidMount() {
    const keys = Object.keys(this.props.taskmanager.taskList);
    const array:Task[] = [];
    keys.forEach((key:string) => {
      const listItem:ITaskmanagerTypeList = this.props.taskmanager.taskList[key];
      const listKeys = Object.keys(listItem);
      listKeys.forEach((k:string) => {
        listItem[k]['categoryType'] = parseInt(key, 10);
        array.push(listItem[k]);
      })
    });
    array.sort((n1, n2) => {
      return n1.startTime < n2.startTime ? 1 : -1;
    })

    this.setState({
      list:array
    })
  }
  public render()
  {
    return (
      <div className="record-wrap">
        <div className="record-title">
          <h3 className="record-h3">操作记录</h3>
          <div className="record-tip">注意：这些记录将会在您登出或离开NNS页面时清空。</div>
        </div>
        <div className="record-list">
          {
            this.state.list.map((item, index) => {
              return <RecordList item={item} key={index}/>
            })
          }
        </div>
      </div>
    );
  }
}
