class App {
    loaders = []
    instances = []
    constructor() { 
        console.log('[APP] Init')
    }
    async start() {
        console.log('[APP] Start')
        this.instances = this.loaders.map(loader => {
            let obj = {}
            obj[`${loader.moduleName}`] = loader.load()
            window[`${loader.moduleName.toUpperCase()}`] = obj[`${loader.moduleName}`]
            return obj
        })
    }
    inject(loader) {
        console.log(`[APP] ${loader} is Injectected`)
        this.loaders.push(loader)
    }
}

(() => {
    window.APP = new App()
})()