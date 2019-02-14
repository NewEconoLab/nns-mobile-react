// 整体布局
import * as React from 'react';
import * as PropTypes from 'prop-types';
import Header from '@/components/header';
import TopTips from './toptips';
import {zh_CN, en_US} from '@/language';
import store from '@/store/common';
import taskmanagerStore from '@/store/taskmanager';
import './index.less';

export default class LayoutIndex extends React.Component<any, any> {
  public static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
      }).isRequired
    }).isRequired
  }
  public state = {
    isHomePage:true // 是否为home页，true为是
  }

  public componentDidMount () {
    const titles = store.language === 'en' ? en_US.title : zh_CN.title;
    const titleKeys = Object.keys(titles);

    // 页面初始化的时候匹配一次
    const arr = titleKeys.filter(v => new RegExp(v).test(this.context.router.history.location.pathname));
    document.title = titles[arr[arr.length - 1]];
    store.title = titles[arr[arr.length - 1]];
    if(window.location.hash === '#/'){
      this.setState({
        isHomePage:true
      })
    }else{
      this.setState({
        isHomePage:false
      })
    }
    // 监听路由改变，重新匹配title
    this.context.router.history.listen(() => {
      if(window.location.hash === '#/'){
        this.setState({
          isHomePage:true
        })
      }else{
        this.setState({
          isHomePage:false
        })
      }
      const titles2 = store.language === 'en' ? en_US.title : zh_CN.title;
      const arr2 = titleKeys.filter(v => new RegExp(v).test(this.context.router.history.location.pathname));
      document.title = titles2[arr2[arr2.length - 1]];
      store.title = titles2[arr2[arr2.length - 1]];
    });
  }

  public render() {
    return (
      <div className="layout-container">
        <Header locale={store.language === 'en' ? en_US.header : zh_CN.header} isHome={this.state.isHomePage}/>
        <div className="layout-main">
          <TopTips taskmanager={taskmanagerStore} locale={store.language === 'en' ? en_US.message : zh_CN.message}/>
          {this.props.children}
        </div>
      </div>
    );
  }
}
