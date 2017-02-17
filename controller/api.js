'use strict';

const fs = require('fs');
const path = require('path');
const baseDir = process.cwd();

let core = {
    * getZt () {
        let fpath = path.join(baseDir, 'api/zt.json');
        let fstat = yield stat(fpath);

        if(fstat.isFile()) {
            this.type = path.extname(fpath);
            this.body = fs.createReadStream(fpath);
        }
    },
    * getCourseItems () {
        let fpath = path.join(baseDir, 'api/course.json');
        let fstat = yield stat(fpath);

        if(fstat.isFile()) {
            this.type = path.extname(fpath);
            this.body = fs.createReadStream(fpath);
        }
    },
    * getArticleItems () {
        let fpath = path.join(baseDir, 'api/article.json');
        let fstat = yield stat(fpath);

        if(fstat.isFile()) {
            this.type = path.extname(fpath);
            this.body = fs.createReadStream(fpath);
        }
    },
    * getArticle () {
        let id = +this.params.id;
        let originData = require('../api/detail.json');
        let article = originData.filter(item => item.contentId === id );
        if(article.length) {
            this.body = article;
        } else {
            this.body = { code: '404' }
        }
    }
}

function stat(file) {
    return function (done) {
        fs.stat(file, done)
    }
}

module.exports = core;