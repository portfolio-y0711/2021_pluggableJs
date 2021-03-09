class App {
    appName = '2021_modular'
    modules = new Map()
    libraries = new Map()
    adaptors = new Map()
    proxy
    store 
    self
    constructor() {
       this.self = this 
    }
    async start() {
        Array.from(this.modules.keys()).forEach((key) => {
           const moduleInstance = this.modules.get(key) 
           moduleInstance.componentDidMount()
        })
        Array.from(this.adaptors.keys()).forEach((key) => {
            const adaptor = this.adaptors.get(key)
            if (adaptor.hasOwnProperty('injectModuleInstance')) {
                this.modules.forEach(m => adaptor.injectModuleInstance(m))
            }
            if (adaptor.hasOwnProperty('injectAdaptorInstances')) {
                adaptor.injectAdaptorInstances(this.adaptors)
            }
        })
    }
    injectAdaptorLoader(loader) {
        const { adaptorName } = loader
        console.log(`[APP] |${adaptorName}| Adaptor Loader Injected`)
        const adaptorInstance = loader.load(this)
        this.adaptors.set(`${adaptorName}`, adaptorInstance)
    }
    injectModuleLoader(loader) {
        const adaptors = Array.from(this.adaptors.keys()).map(key => this.adaptors.get(key))

        if (adaptors.length > 0) {
            this.proxy = adaptors.reduce((acc, adaptor) => {
                return Object.assign(acc, { ...adaptor })
            }, {})
        }

        const { moduleName } = loader
        console.log(`[APP] |${moduleName}| Module Loader Injected`)
        const moduleInstance = loader.load(this.proxy || this)
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