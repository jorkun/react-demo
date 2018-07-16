import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/array';
import 'raf/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import RoutesMap from 'routers/index';
import "utils/flexible";
import "resources/styles/base.scss";

import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

ReactDOM.render(<LocaleProvider locale={zh_CN}>
    <RoutesMap />
</LocaleProvider>, document.getElementById('root'));
registerServiceWorker();
