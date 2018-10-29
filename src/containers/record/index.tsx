/**
 * 操作记录布局
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import RecordList from './recordlist'
import './index.less'
import { IRecordProps, IRecordState } from './interface/record.interface';
import { Task } from '@/store/interface/taskmanager.interface';
import { ActivityIndicator } from 'antd-mobile';
import { injectIntl } from 'react-intl';

@inject('taskmanager')
@observer
class Record extends React.Component<IRecordProps, IRecordState>
{
  public prop = this.props.intl.messages;
  public state = {
    list: []
  }
  public componentDidMount()
  {
    let tasks:Task[] =this.props.taskmanager.taskList;
    tasks = tasks.sort((n1, n2) =>
    {
      return n1.startTime > n2.startTime ? -1 : 1;
    })
    this.setState({
      list: tasks
    })
  }
  public render()
  {
    return (
      <div className="record-wrap">
        {
          !!!this.state.list &&
          <div className="nodata-page">
            <div className="nodata-wrap">
              <ActivityIndicator animating={true} />
            </div>
          </div>
        }
        {
          this.state.list.length === 0 &&
          <div className="nodata-page">
            <div className="nodata-wrap">
              <img src={require('@/img/nodata.png')} alt="" />
              <p>{this.prop.message.empty}</p>
            </div>
          </div>
        }
        {
          this.state.list.length !== 0 &&
          <>
            <div className="record-title">
              <h3 className="record-h3">{this.prop.record.title}</h3>
              <div className="record-tip">{this.prop.record.tips}</div>
            </div>
            <div className="record-list">
              {
                this.state.list.map((item, index) =>
                {
                  return <RecordList item={item} key={index} />
                })
              }
            </div>
          </>
        }

      </div>
    );
  }
}
export default injectIntl(Record);