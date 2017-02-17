
import Vue from 'vue';
import VueRouter from 'vue-router';

import IndexView from '../views/indexView';
import ArticleItems from '../views/articleItems';
import ArticleDetail from '../views/articleDetail';

Vue.use(VueRouter);


const router = new VueRouter({
    mode: 'history',
    base: '/c/',
    routes: [
        {
            path: '/:alias',
            component: IndexView
        }, {
            path: '/:alias/list',
            component: ArticleItems
        },
        {
            path: '/:alias/:id',
            component: ArticleDetail
        }
    ]
});

export default router
