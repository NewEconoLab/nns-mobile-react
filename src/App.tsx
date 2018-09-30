import * as React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider, observer } from "mobx-react";
import {IntlProvider} from 'react-intl';
import Layout from './containers/layout/index';
import routes from './routers';
import store from "./store";

import {en_US, zh_CN} from '@/language';


setTimeout(() => {
  store['common'].language = 'en'
}, 3000)

// setTimeout(() => {
//   store['common'].language = 'cn'
// }, 6000)

const ObserverRender = observer(() => {
  let messages = en_US;

  if(store['common'].language === 'cn') {
    messages = zh_CN
  }

  // console.log(messages)
  return (
    <IntlProvider 
      locale='en'
      messages={messages}
    >
      {renderRoutes(routes)}
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
