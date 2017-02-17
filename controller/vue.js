'use strict';

const serialize = require('serialize-javascript')

let util = require('../util');

let core = {

    * get() {
        let s = Date.now();
        let data = util.getRenderData('vue');

        let bundleRenderer = util.getVueServerBundler('vue');
        let vueString;

        // Attention, if router has a base field, it need to be removed in server's url;
        let url = this.url.replace(/\/c/, '');
        let context = { url };

        if(bundleRenderer){
            vueString = yield new Promise((resolve, reject) => {
                bundleRenderer.renderToString(
                    context,
                    (err, html) => {
                    if(err) {
                        console.error('bundle rendering error', err);
                        resolve('');
                    }
                    let initialData = serialize(context.initialState, { isJSON: true });
                    html += `<script>
                                window.__INITIAL_STATE__ = ${initialData}
                            </script>`;

                    resolve(html);
                });
            })
        }

        let duration = Date.now() - s;
        
        data.vueString = vueString ? vueString : '<div class="wrapper"></div>';
        // data.vueString = '<div class="wrapper"></div>';

        yield this.render('vue', data);
    }
};

module.exports = core;
