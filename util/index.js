'use strict';

const fs = require('fs');
const path = require('path');
const VueRender = require('vue-server-renderer');

let env = process.env.NODE_ENV;
let pack = require('../config/pack.json');

let core = {
    env: env,
    isLocal: env === 'local',
    isDEV : env === 'development',
    isQA : env === 'qa',
    isPRE : env === 'yz',
    isRelease : env === 'production',
    isNode: env === 'node',
    getPublicPath(target){
        let isCurrent = pack.target === target;
        let pathStr = isCurrent && this.isLocal && `/${target}/`;
        return pathStr;
    },
    getManifest(target){
        let dir = this.isRelease || this.isPRE ? 'build' : this.isQA ? 'qa' : 'dev',
            manifest = require(`../public/page/${target}/${dir}/manifest.json`);
        return manifest;
    },
    isOnCompile(target){
        return pack.target === target;
    },
    getRenderData(target){

        let manifest = this.getManifest(target);
        let publicPath = this.getPublicPath(target);
        let isOnCompile = this.isOnCompile(target);
        let data = {
            isOnCompile: this.isLocal && isOnCompile,
            publicPath,
            manifest
        };
        return data;
    },
    getVueServerBundler(target){
        let bundlePath = path.resolve(__dirname, `../public/page/${target}/server/bundle.js`);
        let code = fs.readFileSync(bundlePath, 'utf-8')
        let bundler = VueRender.createBundleRenderer(code);

        return bundler;
    },
    result(status, message, data){
        return {
            status: status || 0,
            message: message || '',
            data: data || ''
        };
    },
};

module.exports = core;
