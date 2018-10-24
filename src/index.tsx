declare var module: any
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import './reset.less';
import registerServiceWorker from './registerServiceWorker';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import en_US from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd';
import storeCommon from '@/store/common';
// import VConsole from 'vconsole';

if (process.env.NODE_ENV === "development") {

  // const Vconsole = new VConsole();
  // console.log(Vconsole);

  ReactDOM.render(
    <AppContainer>
      <LocaleProvider locale={storeCommon.language === 'en' ? en_US : zh_CN}>
        <App />
      </LocaleProvider>
    </AppContainer>,
    document.getElementById('root') as HTMLElement
  );
  if (module.hot) {
    module.hot.accept();
  }
}


if (process.env.NODE_ENV === "production") {
  ReactDOM.render(
    <LocaleProvider locale={zh_CN}>
      <App />
    </LocaleProvider>,
    document.getElementById('root') as HTMLElement
  );
}

registerServiceWorker();
