class App {
    constructor() { 
        console.log('[APP] Init')
    }
}

(() => {
    window.APP = new App()
})()