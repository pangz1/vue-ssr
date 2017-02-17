'use strict';
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = require('./config/pack.json');
let util = require('./util');
let packageJSON = require('./package.json');

let base = path.resolve(config.base, config.target);
let dest = path.resolve(config.dest, config.target);

let modules = {
    babel: {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
            cacheDirectory: true
        }
    },
    scss: {
        test: /\.scss$/,
        loader: util.isLocal ? 'style-loader!css-loader!postcss-loader!sass-loader' : ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
    },
    css:{
        test: /\.css$/,
        loader: util.isLocal ? 'style!css' : ExtractTextPlugin.extract('style-loader', 'css-loader')
    },
    vue: {
        test: /\.vue$/,
        loader: 'vue'
    },
    json: {
        test: /\.json$/,
        loader: 'json'
    },
    url: {
        test: /\.(png|jpg|gif|ico)$/, // edit this for additional asset file types
        loader: 'url',
        query: {
            limit: 4096, // inline files smaller then 10kb as base64 dataURL
            name: '[name].[ext]?[hash]' // fallback to file-loader with this naming scheme
        }
    },
    font: {
         test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
         loader: 'url',
         query: {
             limit: 10000,
             mimetype: 'application/font-woff'
         }
    },
    font2: {
        test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
    }
};

// let defaultEntry = path.resolve(base, 'main.js');

let clientOutputPath = util.isRelease || util.isPRE ? '/build' : util.isQA ? '/qa' : '/dev';

let clientPack = {
    entry: {
    },
    output: {
        path: dest + clientOutputPath,
        publicPath: util.getPublicPath(config.target),
        filename: util.isDEV || util.isLocal ? '[name].js' : '[name].[hash:8].js'
    },
    module: {
        loaders: [
            modules.scss,
            modules.css,
            modules.json,
            modules.vue,
            modules.font,
            modules.font2,
            modules.url
        ]
    },
    plugins: [],
    postcss: [autoprefixer({
        browsers: ['> 5%']
    })],
    resolve: {
        extensions: ['', '.js', '.scss', '.vue'],
        modulesDirectories: ['node_modules'],
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    watch: util.isLocal,
    debug: util.isLocal || util.isDEV || util.isQA,
    devtool: util.isLocal || util.isDEV || util.isQA ? 'source-map' : null
};

let extractCss = util.isRelease || util.isPRE? '[name].[hash:8].css' : '[name].css';
let plugins = {
    define: new webpack.DefinePlugin({
        __DEV__: JSON.stringify(util.isDEV),
        __QA__: JSON.stringify(util.isQA),
        __LOCAL__: JSON.stringify(util.isLocal),
        __PRE__: JSON.stringify(util.isPRE),
        __RELEASE__: JSON.stringify(util.isRelease),
        __NODE__: JSON.stringify(util.isNode)
    }),
    uglify: new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    css: new ExtractTextPlugin(extractCss),
    manifest: new ManifestPlugin(),
    order: new webpack.optimize.OccurenceOrderPlugin(),
    hot: new webpack.HotModuleReplacementPlugin(),
    noerror: new webpack.NoErrorsPlugin(),
    vendor: new webpack.optimize.CommonsChunkPlugin('vendor', util.isRelease || util.isPRE ? 'vendor.bundle.[hash:8].js' : 'vendor.bundle.js')
};

if(util.isLocal){
    clientPack.plugins.push(plugins.order);
    clientPack.plugins.push(plugins.hot);
    clientPack.plugins.push(plugins.noerror);
}else{
    clientPack.plugins.push(plugins.manifest);
}

clientPack.plugins.push(plugins.define);
clientPack.plugins.push(plugins.css);

if (util.isRelease || util.isPRE) {
    clientPack.plugins.push(plugins.uglify);
}

let hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

const addEntry = (name, filename) => {
    clientPack.entry[name] = [path.resolve(base, filename)];
    if(util.isLocal){
        clientPack.entry[name].push(hotMiddlewareScript);
    }
}


let serverPack = {
    target: 'node',
    entry: {},
    output: {
        filename: 'bundle.js',
        path: dest + '/server',
        libraryTarget: 'commonjs2',
    },
    resolve: clientPack.resolve,
    module: clientPack.module,
    externals: Object.keys(packageJSON.devDependencies),
    plugins: [plugins.define]
};

const addSSR = (name, filename) =>{
    serverPack.entry[name] = [path.resolve(base, filename)];
}

module.exports = {
    clientPack,
    serverPack,
    modules,
    plugins,
    addEntry,
    addSSR
};
