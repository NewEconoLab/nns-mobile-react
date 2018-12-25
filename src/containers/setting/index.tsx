/**
 * 设置页面
 */
import * as React from 'react';
import './index.less'
import { observer, inject } from 'mobx-react';
import { injectIntl } from 'react-intl';
import { List } from 'antd-mobile';
import TitleText from '@/components/titletext';
import { ICommonStore } from '@/store/interface/common.interface';
import { RouteComponentProps } from 'react-router-dom';
interface IProp extends RouteComponentProps{
  common:ICommonStore,
  intl:any
}

@inject('common')
@observer
class Setting extends React.Component<IProp, any> {
  public state = {
    language:''
  }
  public prop = this.props.intl.messages;
  public componentDidMount()
  {
    const sessionLanguage = sessionStorage.getItem('language');
    const lang = sessionLanguage?sessionLanguage:this.props.common.language;
    if(lang==='en'){
      this.setState({
        language:'English'
      })
    }else{
      this.setState({
        language:'简体中文'
      })
    }
  }
  // 到设置语言页面
  public toSettingLanguage = () => {
    this.props.history.push('/language')
  }

  public render()
  {
    return (
      <div className="setting-page">
      <TitleText text={this.prop.setting.title} />
        <List>
          <List.Item arrow="horizontal" style={{height:'54px'}} onClick={this.toSettingLanguage} >
            {this.prop.setting.language}{this.state.language}
          </List.Item>
        </List>
      </div>
    );
  }
}

export default injectIntl(Setting);
