'use strict';

const router = require('koa-router')();
let vue = require('./controller/vue');

const api = require('./controller/api');

router.get('/c(/.+)?', vue.get);
router.get('/api/zt', api.getZt);
router.get('/api/course_items', api.getCourseItems);
router.get('/api/article_items', api.getArticleItems);
router.get('/api/article/:id', api.getArticle);


let route = function(app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};

module.exports = route;
