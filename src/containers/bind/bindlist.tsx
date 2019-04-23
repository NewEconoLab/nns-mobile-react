/**
 * 选择域名
 */
import * as React from 'react';
import TitleText from '@/components/titletext';
import { observer, inject } from 'mobx-react';
import { injectIntl } from 'react-intl';
import { SearchBar, List, Button, Radio } from 'antd-mobile';
import Alert from '@/components/alert';
import classnames from 'classnames';
import './index.less'
import { IBindProps } from './interface/index.interface';
import { nnstools } from '@/utils/nnstools';
import taskmanager from '@/store/taskmanager';
import { Task, TaskType, ConfirmType } from '@/store/interface/taskmanager.interface';

@inject('bind','common','statemanager')
@observer
class BindDomain extends React.Component<IBindProps, any>
{
  public prop = this.props.intl.messages;
  public listRef: React.RefObject<HTMLDivElement> = React.createRef();
  public state = {
    searchValue: '',
    value: '',
    bindFlag: '0',
  };
  public componentDidMount()
  {
    this.props.bind.getBindDomainList();
    window.addEventListener('scroll', this.onScroll, false);
  }
  public onScroll = () =>
  {
    if (this.props.bind.bindList.length === 0)
    {
      return;
    }
    if (!this.listRef || !this.listRef.current)
    {
      return;
    }

    const winScroll = window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
    if (winScroll + (document.documentElement ? document.documentElement.clientHeight : 0) >= this.listRef.current.offsetHeight + this.listRef.current.offsetTop + 46)
    {
      this.props.bind.pageIndex++;
      this.getBindList();
    }
  }
  // 获取列表
  public getBindList = () =>
  {
    if (this.state.searchValue === '')
    {
      console.log('正常加载');
      this.props.bind.getBindDomainList();
    } else
    {
      console.log("搜索加载")
      this.props.bind.getBindDomainList(this.state.searchValue);
    }
  }
  // 搜索功能
  public onSearchBind = (value: string) =>
  {
    console.log(value);
    this.props.bind.pageIndex=1;
    this.props.bind.bindList = [];
    this.props.bind.isLast =false;
    this.setState({
      searchValue:value
    },()=>{
      this.getBindList();
    })
    
  }
  // 选择想要替换的域名
  public onChange = (item) =>
  {
    this.setState({
      value: item.fulldomain,
      bindFlag: item.bindflag
    });
  };
  // 保存选择
  public onSaveBind = async () =>
  {
    // 绑定域名
    if (this.state.bindFlag === '0')
    {
      this.props.statemanager.bindDomainState.push(this.state.value);
      const res = await nnstools.bindDomain(this.state.value, this.props.common.address);
      if (res && res["txid"] !== '')
      {
        const txid = res["txid"];
        taskmanager.addTask(
          new Task(
            TaskType.bindDoamin,
            ConfirmType.contract,
            txid,
            { domain: this.state.value }
          )
        );

        Alert(this.prop.message.successmsg, this.prop.message.waitmsg, this.prop.btn.confirm, () =>
        {
          this.props.history.goBack();
        });
      } else
      {
        Alert(this.prop.message.errmsg, this.prop.message.errmsgtip1, this.prop.btn.confirm, () =>
        {
          return;
        }, 'error');
        this.props.statemanager.bindDomainStateDel(this.state.value);
      }
    }
    else
    {
      // 解除绑定
      this.props.statemanager.delBindDomainState.push(this.state.value);
      const res = await nnstools.cancalBindDomain(this.props.common.address);
      if (res && res["txid"] !== '')
      {
        const txid = res["txid"];
        taskmanager.addTask(
          new Task(
            TaskType.delBindDomain,
            ConfirmType.contract,
            txid,
            { domain: this.state.value }
          )
        );

        Alert(this.prop.message.successmsg, this.prop.message.waitmsg, this.prop.btn.confirm, () =>
        {
          this.props.history.goBack();
        });
      } else
      {
        Alert(this.prop.message.errmsg, this.prop.message.errmsgtip1, this.prop.btn.confirm, () =>
        {
          return;
        }, 'error');
        this.props.statemanager.delBindDomainStateDel(this.state.value);
      }
    }
  }
  public componentWillUnmount()
  {
    this.props.bind.bindList = [];
    this.props.bind.pageIndex = 1;
    this.props.bind.isLast = false;
    window.removeEventListener('scroll', this.onScroll);
  }
  public render()
  {
    const { value } = this.state;
    const RadioItem = Radio.RadioItem;
    const bindSaveClassname = classnames('detail-btn', { 'ghost': this.state.value === '' })
    return (
      <div className="bindlist-wrap">
        {/* 搜索功能 */}
        <React.Fragment>
          <div className="search-box">
            <SearchBar
              placeholder={this.prop.bind.search}
              style={{ "width": "3.75rem" }}
              value={this.state.searchValue}
              onChange={this.onSearchBind}
            />
          </div>
        </React.Fragment>
        <TitleText text={this.prop.bind.bindlisttitle} />
        <List>
          {this.props.bind.bindList.map(i => (
            <RadioItem key={i.fulldomain} checked={value === i.fulldomain} onChange={this.onChange.bind(this, i)}>
              {i.bindflag === '1' ? this.prop.bind.unbind : i.fulldomain}
            </RadioItem>
          ))}
        </List>
        <div className="save-bind">
          <Button
            type="primary"
            style={{ borderRadius: '0' }}
            className={bindSaveClassname}
            disabled={this.state.value === ''}
            onClick={this.onSaveBind}
          >{this.prop.btn.confirm}</Button>
        </div>
      </div>
    );
  }
}
export default injectIntl(BindDomain);