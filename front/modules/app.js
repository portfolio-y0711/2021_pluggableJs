class App {
    instances = {}
    self
    logger
    constructor() { 
        this.self = this
        console.log('[APP] Init')
    }
    inject(loader) {
        console.log(`[APP] ${loader.moduleName} is Injectected`)
        this.instances[`${loader.moduleName}`] = loader.load(this.self)
        console.log(this.instances)
    }
    async start() {
        console.log('[APP] Start')
        Object.values(this.instances).forEach(i => {
            i.init()
        })
    }
    pathsUpdate(paths) {
        console.log('[APP] pathsUpdated Invoked')
        this.instances['Paths'].updateUI(paths)
    }
    finderUpdate(path) {
        console.log('[APP] finderUpdate Invoked')
        let id
        if (path === 'Root') {
            id = 0
        } else {
            id = parseInt(path)
        }
        this.instances['Finder'].gotoPath(id)
    }
}

(() => {
    window.DEBUG = true
    window.LOGGER = (msg) => {
        window.DEBUG && console.log(msg)
    }
    window.APP = new App()

})()