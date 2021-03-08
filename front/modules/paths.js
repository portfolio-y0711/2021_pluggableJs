const pathsLoader = (() => {
    let moduleName = 'Paths'
    const load = (app) => {
        return new Paths(app)
    }
    return {
        load,
        moduleName
    }
})()

class Paths {
    wrapper
    self
    app
    constructor(app) {
        // constructor
        console.log('[MOD] (Paths) Init')
        this.api = window.API
        this.app = app
        this.wrapper = document.querySelector('paths')
        this.self = this
    }
    init() {
        const view = this.self.createView([0])
        this.cleanUI()
        this.wrapper.querySelector('ol').insertAdjacentHTML('beforeend', view)

    }
    cleanUI() {
        this.wrapper.querySelector('ol').innerHTML = ''
    }
    createView (paths) {
        const ol = document.createElement('ol')
        ol.classList.add('arrows')
        const template = (path) => (path === 0) 
            ? `<li><a id=${path} href="#">Root</a></li>`
            : `<li><a id=${path} href="#">${path}</a></li>`
        return paths.map(template).join('') 
    }
    async updateUI(pathArr) {
        this.self.cleanUI()
        console.log(pathArr)
        const view = this.self.createView(pathArr)
        this.cleanUI()
        this.wrapper.querySelector('ol').insertAdjacentHTML('beforeend', view)

        Array.from(this.wrapper.querySelectorAll('ol li a')).forEach(f => {
            f.addEventListener('click', async(e) => {
                console.log(this.app)
                this.app.finderUpdate(e.currentTarget.id)
            })
        })
    }
}

(async()=> {
    const App = window.APP 
    const Api = window.API
    App.inject(pathsLoader)
})();