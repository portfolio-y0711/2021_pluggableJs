class App {
    loader
    constructor() { 
        console.log('[APP] Init')
    }
    async start() {
        console.log('[APP] Start')
        const instance = this.loader()
    }
    inject(loader) {
        console.log(`[APP] ${loader} is Injectected`)
        this.loader = loader
    }
}

(() => {
    window.APP = new App()
})()