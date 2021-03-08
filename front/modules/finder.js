const finderLoader = (() => {
    let moduleName = 'Finder'
    const load = (app) => {
        return new Finder(app)
    }
    return {
        load,
        moduleName
    }
})()

class Finder {
    wrapper
    api
    app
    self
    paths = []
    constructor(app) {
        // constructor
        console.log('[MOD] (Finder) Init')
        this.api = window.API
        this.app = app
        this.wrapper = document.querySelector('finder')
        this.self = this
    }
    init() {
        this.self.gotoPath(0)
    }
    getInfo(id) {
        return this.api.get(id || 'root')
    }
    getView(item) {
        const template = (data) => {
            const { id, type, title } = data
            const [filetype, icon] = 
                (type === 'DIRECTORY') 
                ? ['folder', 'folder']
                : (type === 'FILE')
                    ? ['file', 'file_present']
                    : ['', '']
            return (`
                <div id="${id}" class="${filetype}">
                    <i class="material-icons">${icon}
                        <p class="cooltip">0 folders / 0 files</p>
                    </i>
                    <h1>${title}</h1>
                </div> 
            `)
        }
        return template(item)
    }
    cleanUI() {
        this.wrapper.innerHTML = ''
    }
    createButtonUI () {
        const template = `
            <div id="revert">
                <div class="file">
                    <i class="material-icons">arrow_left
                        <p class="cooltip">to previous</p>
                    </i>
                </div>
            </div>
        `
        this.wrapper.innerHTML = template
        document.getElementById('revert').addEventListener('click', () => {
            this.self.gotoPath(0)
        })
    }
    async gotoPath(id) {
        this.self.cleanUI()
        this.self.createButtonUI()
        const items = (await this.getInfo(id))
        const view = items.map(this.getView).join('')
        this.wrapper.insertAdjacentHTML('beforeend', view)

        Array.from(this.wrapper.querySelectorAll('div.folder')).forEach(f => {
            f.addEventListener('click', async(e) => {
                const id = e.currentTarget.id
                if (id === 0 || this.paths.length === 0) {
                    this.paths = [0]
                } 
                if (id !== 0) {
                    this.paths.push(parseInt(id))
                }
                this.app.pathsUpdate(this.paths)
                this.self.gotoPath(id)
            })
        })

        Array.from(this.wrapper.querySelectorAll('div.file')).forEach(f => {
            f.addEventListener('click', async(e) => {
                console.log(e.currentTarget.id)
            })
        })
    }
}

(async()=> {
    const App = window.APP 
    const Api = window.API
    App.inject(finderLoader)
})();