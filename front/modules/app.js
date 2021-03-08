class App {
    appName = '2021_modular'
    modules = new Map()
    libraries = new Map()
    adaptors = []
    proxy
    store 
    self
    constructor() {
       this.self = this 
    }
    start() {
        this.store = this.proxy.createStore()
        Array.from(this.modules.keys()).forEach(key => {
           const instance = this.modules.get(key) 
           instance.store = this.store
           console.log(instance.store)
           instance.render()
        })
    }
    injectAdaptorLoader(loader) {
        const { adaptorName } = loader
        console.log(`[APP] |${adaptorName}| Adaptor Loader Injected`)
        this.adaptors.push(loader.load(this))
    }
    injectModuleLoader(loader) {
        this.proxy = this.adaptors.reduce((acc, adaptor) => {
            return Object.assign(acc, { ...adaptor })
        }, {})

        const { moduleName } = loader
        console.log(`[APP] |${moduleName}| Module Loader Injected`)
        const moduleInstance = loader.load(this.proxy)
        this.modules.set(`${moduleName}`, moduleInstance)
    }
    injectLibraryLoader(loader) {
        const { libName } = loader
        console.log(`[APP] |${libName}| Loader Injected`)
        const libInstance = loader.load(this)
        this.libraries.set(`${libName}`, libInstance)
    }
}

(() => {
   window.APP = new App() 
})()