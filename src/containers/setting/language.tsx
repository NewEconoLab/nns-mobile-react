/**
 * 语言设置页面
 */
import * as React from 'react';
import './index.less'
import { observer, inject } from 'mobx-react';
import { injectIntl } from 'react-intl';
import { List, Radio, Button } from 'antd-mobile';
import { RouteComponentProps } from 'react-router-dom';
import { ICommonStore } from '@/store/interface/common.interface';
import classnames from 'classnames';
interface IProp extends RouteComponentProps
{
  common: ICommonStore,
  intl: any
}
@inject('common')
@observer
class Language extends React.Component<IProp, any> {
  public state = {
    value: 0,
    language: 0
  };

  public prop = this.props.intl.messages;
  public componentDidMount()
  {
    const sessionLanguage = sessionStorage.getItem('language');
    const lang = sessionLanguage?sessionLanguage:this.props.common.language;
    if (lang === 'en')
    {
      this.setState({
        value: 1,
        language: 1
      })
    } else
    {
      this.setState({
        value: 0,
        language: 0
      })
    }
  }
  public onChange = (value) =>
  {
    this.setState({
      value,
    });
  };
  public onSaveLanguage = () =>
  {
    this.props.common.language = this.state.value === 0 ? 'zh' : 'en';
    sessionStorage.setItem('language',this.props.common.language);
    this.props.history.goBack();
  }
  public render()
  {
    const { value } = this.state;
    const data = [
      { value: 0, label: '简体中文' },
      { value: 1, label: 'English' },
    ];
    const RadioItem = Radio.RadioItem;
    const saveClassname = classnames('detail-btn', { 'ghost': this.state.value === this.state.language })

    return (
      <div className="language-page">
        <List>
          {data.map(i => (
            <RadioItem key={i.value} checked={value === i.value} onChange={this.onChange.bind(this, i.value)}>
              {i.label}
            </RadioItem>
          ))}
        </List>
        <div className="save-language">
          <Button
            type="primary"
            style={{ borderRadius: '0' }}
            className={saveClassname}
            disabled={this.state.value === this.state.language}
            onClick={this.onSaveLanguage}
          >{this.prop.btn.save}</Button>
        </div>
      </div>
    );
  }
}

export default injectIntl(Language);
