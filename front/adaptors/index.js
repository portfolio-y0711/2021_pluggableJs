import { loader as api } from '../api/fakeapi.js'
import { loader as store } from './storeAdaptor.js'
import { loader as pathfinder } from './pathFinder.js'
import { loader as fileviewer } from './fileViewer.js'
import { loader as adaptorHandler } from './adaptorHandler.js'

;(() => {
    const app = window.APP
    if (app.appName === '2021_modular') {
        [ api, store, pathfinder, fileviewer, adaptorHandler ].forEach(loader => {
            app.injectAdaptorLoader(loader)
        })
    }
})()