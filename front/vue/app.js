'use strict';

import Vue from 'vue';
import router from './router';
import store from './store';
import App from './components/app';
import { sync } from 'vuex-router-sync';
import * as filters from './filters';

// 将 route 对象挂载到 store.state 上
sync(store, router);

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

let app = new Vue({
    template: '<app></app>',
    base: '/c/',
    components: {
        App
    },
    router,
    store
});

export {
    app,
    router,
    store
}
