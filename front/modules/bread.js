const loader = (() => {
    let libName = ''
    let moduleName = 'BREAD'
    const load = (app) => new Bread(app)
    return {libName, moduleName, load}
})()

class Bread {
    self
    app
    store
    wrapper
    constructor(app) {
       this.self = this
       this.app = app
       this.wrapper = document.querySelector('bread')
       this.state = {
           pathQue: [],
           pathNameMap: new Map()
       }
       this.app.assignReducer((state = { 'bread': this.state }, action) => {
            return ({
                ...state
            })
       })
    }
    render() {
    }
}


(() => {
    const app = window.APP
    if (app.appName === '2021_modular') {
        app.injectModuleLoader(loader)
    }
})()
