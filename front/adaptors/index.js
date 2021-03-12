import { loader as api } from '../../back/fakeapi.js'
import { loader as store } from './storeAdaptor.js'
import { loader as pathfinder } from './pathFinder.js'

;(() => {
    const app = window.APP
    if (app.appName === '2021_modular') {
        [ api, store, pathfinder ].forEach(loader => {
            app.injectAdaptorLoader(loader)
        })
    }
})()