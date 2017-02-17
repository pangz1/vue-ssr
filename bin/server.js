'use strict';

let http = require('http');
let app = require('../app');
let util = require('../util');
let bs = require('browser-sync').create();


let port = process.env.PORT || 3250;

let server = http.createServer(app.callback());

server.listen(port, function(){
    if(util.isLocal){
        bs.init({
            open: false,
            notify: false,
            proxy: `127.0.0.1:${port}`,
            logConnections: true,
            logPrefix: 'BR-SYNC-LOG',
            files: ['./views/**']
        });
        console.log(`development environment is going to be running on port ${port}.`);
    }
});
