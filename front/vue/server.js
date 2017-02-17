'use strict';

import {app, router, store} from './app';


export default context => {

    const s = Date.now();

    router.push(context.url);
    const matchedComponents = router.getMatchedComponents();
    console.log(matchedComponents)
    if(!matchedComponents) {
        return Promise.reject({ code: '404' });
    }
    return Promise.all(
        matchedComponents.map(component => {
            if(component.preFetch) {
                return component.preFetch(store);
            }
        })
    ).then(() => {
        context.initialState = store.state;
        return app;
    })
}
