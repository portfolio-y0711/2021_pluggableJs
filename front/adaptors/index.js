import { loader as api } from './fakeapi.js'
import { loader as pathfinder } from './pathFinder.js'
import { loader as store } from './storeAdaptor.js'

;(() => {
    const app = window.APP
    if (app.appName === '2021_modular') {
        [ api, pathfinder, store ].forEach(loader => {
            app.injectAdaptorLoader(loader)
        })
    }
})()