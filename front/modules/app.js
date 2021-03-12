class App {
    appName = '2021_modular'
    adaptors = new Map()
    modules = new Map()
    loaders = new Map([
        [ "modules",  new Map() ],
        [ "adaptors", new Map() ]
    ])
    store 
    self
    constructor() {
       this.self = this 
    }
    start() {
        let instance

        // create proxy
        const proxy = [...this.adaptors.values()].reduce((acc, adaptor) => {
            return Object.assign(acc, { ...adaptor })
        }, {})
        const isEmpty = (proxy) => (Object.keys(proxy).length === 0 && proxy.constructor === Object)

        ;[...this.modules].forEach(([moduleName, module]) => {
            module.app = isEmpty(proxy) ? this : proxy 
            const modulePrototypes = Object.getPrototypeOf(module)

            if (modulePrototypes.hasOwnProperty('componentDidMount')) {
                module.componentDidMount()
            }
        })
    }
    injectModuleLoader(loader) {
        const { moduleName } = loader
        LOG(`APP`, `${moduleName}` ,`Module Loader Injected`)
        this.loaders.get('modules').set(moduleName, loader)
        this.modules.set(moduleName, loader.load())
    }
    injectAdaptorLoader(loader) {
        const { adaptorName } = loader
        LOG(`APP`, `${adaptorName}`, `Adaptor Loader Injected`)
        this.loaders.get('adaptors').set(adaptorName, loader)
        this.adaptors.set(adaptorName,loader.load(this))
    }
}

(() => {
   window.APP = new App() 
})()