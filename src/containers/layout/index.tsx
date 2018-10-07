// 整体布局
import * as React from 'react';
import * as PropTypes from 'prop-types';
import Header from '@/components/header';
import {zh_CN, en_US} from '@/language';
import store from '@/store/common';

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

  public componentDidMount () {
    const titles = store.language === 'en' ? en_US.title : zh_CN.title;
    const titleKeys = Object.keys(titles);

    // 页面初始化的时候匹配一次
    const arr = titleKeys.filter(v => new RegExp(v).test(this.context.router.history.location.pathname));
    document.title = titles[arr[arr.length - 1]];
    store.title = titles[arr[arr.length - 1]];

    // 监听路由改变，重新匹配title
    this.context.router.history.listen(() => {
      const arr2 = titleKeys.filter(v => new RegExp(v).test(this.context.router.history.location.pathname));
      document.title = titles[arr2[arr2.length - 1]];
      store.title = titles[arr2[arr2.length - 1]];
    });
  }

  public render() {
    return (
      <div className="layout-container">
        <Header locale={store.language === 'en' ? en_US.header : zh_CN.header}/>
        <div className="layout-main">
          {this.props.children}
        </div>
      </div>
    );
  }
}
