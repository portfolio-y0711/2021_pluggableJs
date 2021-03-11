import { loader as breadloader } from './bread.js'
import { loader as finderloader } from './finder.js'

(() => {
    const app = window.APP
    if (app.appName === '2021_modular') {
        [ breadloader, finderloader ].forEach(loader => {
            app.injectModuleLoader(loader)
        })
    }
})()