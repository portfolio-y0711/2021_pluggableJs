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
    constructor() {
        // constructor
        console.log('[MOD] (Paths) Init')
        this.api = window.API
        this.wrapper = document.querySelector('paths')
        this.self = this
    }
    // getInfo(id) {
    //     return this.api.get(id || 'root')
    // }
    // getView(item) {
    //     const template = (data) => {
    //         const { id, type, title } = data
    //         const [filetype, icon] = 
    //             (type === 'DIRECTORY') 
    //             ? ['folder', 'folder']
    //             : (type === 'FILE')
    //                 ? ['file', 'file_present']
    //                 : ['', '']
    //         return (`
    //             <div id="${id}" class="${filetype}">
    //                 <i class="material-icons">${icon}
    //                     <p class="cooltip">0 folders / 0 files</p>
    //                 </i>
    //                 <h1>${title}</h1>
    //             </div> 
    //         `)
    //     }
    //     return template(item)
    // }
    cleanUI() {
        this.wrapper.innerHTML = ''
    }
    createPaths () {
        const ol = document.createElement('ol')
        ol.classList.add('arrows')
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