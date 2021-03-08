const pathsLoader = (() => {
    let moduleName = 'Paths'
    const load = () => {
        return new Paths()
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
    cleanui() {
        this.wrapper.innerhtml = ''
    }
    createpaths () {
        const ol = document.createelement('ol')
        ol.classlist.add('arrows')
        const template = (path) => `<li><a href="#">${path}</a></li>`
    }
    async updatePath(pathArr) {
        this.self.cleanUI()
        console.log(pathArr)
        // this.self.createButtonUI()
        // const items = (await this.getInfo(id))
        // const view = items.map(this.getView).join('')
        // this.wrapper.insertAdjacentHTML('beforeend', view)

        // Array.from(this.wrapper.querySelectorAll('div.folder')).forEach(f => {
        //     f.addEventListener('click', async(e) => {
        //         this.self.gotoPath(e.currentTarget.id)
        //     })
        // })

        // Array.from(this.wrapper.querySelectorAll('div.file')).forEach(f => {
        //     f.addEventListener('click', async(e) => {
        //         console.log(e.currentTarget.id)
        //     })
        // })
    }
}

(async()=> {
    const App = window.APP 
    const Api = window.API
    App.inject(pathsLoader)
})();