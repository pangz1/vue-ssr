'use strict';

import { app, store } from './app';

import './main.scss';

store.replaceState(window.__INITIAL_STATE__);

app.$mount('.wrapper');
