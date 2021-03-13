import { loader as breadloader } from './bread.js'
import { loader as finderloader } from './finder.js'
import { loader as modalloader } from './modal.js'

(() => {
    const app = window.APP
    if (app.appName === '2021_modular') {
        [ breadloader, finderloader, modalloader ].forEach(loader => {
            app.injectModuleLoader(loader)
        })
    }
})()