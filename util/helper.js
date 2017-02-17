'use strict';

let env = process.env.NODE_ENV;
let config = require('../config/setting');

module.exports = {
    /**
     * pass current context into it
     */
    login: function(context, redirectUrl) {
        redirectUrl = redirectUrl || context.header.origin + context.url;
        let url = config[env].pass.login + '?url=' + redirectUrl;
        context.redirect(url);
    }
};
