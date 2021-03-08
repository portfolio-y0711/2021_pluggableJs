class Api {
    constructor(baseUrl) {
        console.log('[API] Module: Api Created')
        this.baseUrl = baseUrl || 'http://localhost:5000'
    }
    async get(path) {
        if (path === 'root' || path === 0) {
            const res = await (await fetch(`${this.baseUrl}/root`)).json()
            return res
            
        } else {
            return await (await fetch(`${this.baseUrl}/folder/${path}`)).json()
        }
    }
}


(() => {
    window.API = new Api()
})();