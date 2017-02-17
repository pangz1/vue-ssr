'use strict';

const path = require('path');

module.exports = error;

/**
 * Error Middleware.
 *
 *  - `template` defaults to ./error.html
 *
 * @param {Object} opts
 * @api public
 */

function error(opts) {
    opts = opts || {};

    // template
    let env = process.env.NODE_ENV;

    return function* error(next) {
        try {
            yield * next;
        } catch (err) {
            this.status = err.status || 500;

            this.app.emit('error', err, this);

            let type = this.accepts('html', 'text', 'json');

            if(type === 'json'){
                this.body = {
                    status: 500,
                    message: err.message
                };
            }else{
                yield this.render('error', {
                    env: env,
                    error: err.message,
                    stack: err.stack,
                    status: this.status,
                    code: err.code
                });
            }
        }
    };
}
