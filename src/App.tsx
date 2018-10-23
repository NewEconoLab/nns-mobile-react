import * as React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider, observer } from "mobx-react";
import { IntlProvider, addLocaleData } from 'react-intl';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';
import Layout from './containers/layout/index';
import routes from './routers';
import store from "./store";
import commonStore from './store/common';
import { en_US, zh_CN } from '@/language';
import o3tools from '@/utils/o3tools';
import DomainSelling from './store/DomainSelling';
import { TaskTool } from './utils/tasktools';
addLocaleData([...en, ...zh]);

// setTimeout(() => {
//   store['common'].language = 'en'
// }, 3000)

// setTimeout(() => {
//   store['common'].language = 'zh'
// }, 6000)

// 初始化请求
o3tools.init(res => {
  if (res) {
    commonStore.getregisteraddressbalance();
    commonStore.getnep5balanceofaddress();
    DomainSelling.initRoot();
    TaskTool.start();
    console.log("Address:   "+commonStore.address );
    
    return true
  } else {
    return false
  }
});


// 初始化鼠标随机方法
Neo.Cryptography.RandomNumberGenerator.startCollectors();

const ObserverRender = observer(() => {
  let messages = en_US;
  let locale = 'en';

  if (store['common'].language === 'zh') {
    messages = zh_CN;
    locale = 'zh';
  }

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
    >
      {
        (commonStore.accountBalance && commonStore.cgasBalance) ?
          renderRoutes(routes) :
          <div />
      }
    </IntlProvider>
  )
});

export default () => {
  return (
    <Provider {...store}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <ObserverRender />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};
