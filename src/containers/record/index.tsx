/**
 * 操作记录布局
 */
import * as React from 'react';
import RecordList from './recordlist'
import './index.less'

export default class Record extends React.Component
{
  public render()
  {
    return (
      <div className="record-wrap">
        <div className="record-title">
          <h3 className="record-h3">操作记录</h3>
          <div className="record-tip">注意：这些记录将会在您登出或离开NNS页面时清空。</div>
        </div>
        <div className="record-list">
          <RecordList/>
        </div>
      </div>
    );
  }
}
