class App {
    loaders = []
    instances = []
    self
    constructor() { 
        console.log('[APP] Init')
        this.self = this
    }
    async start() {
        console.log('[APP] Start')
        this.instances = this.loaders.forEach(loader => {
            let obj = {}
            let instance = loader.load(this.self)
            obj[`${loader.moduleName}`] = instance
            window[`${loader.moduleName.toUpperCase()}`] = obj[`${loader.moduleName}`]
            this.instances.push(obj)
            console.log(this.instances)
        })
    }
    inject(loader) {
        console.log(`[APP] ${loader} is Injectected`)
        this.loaders.push(loader)
    }
    pathUpdate(paths) {
        console.log(this.instances)
    }
}

(() => {
    window.APP = new App()
})()