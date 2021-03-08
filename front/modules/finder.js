const finderLoader = () => new Finder()

class Finder {
    wrapper
    api
    self
    constructor() {
        // constructor
        console.log('[MOD] (Finder) Init')
        this.api = window.API
        this.wrapper = document.querySelector('finder')
        this.self = this
        this.self.updateUI()
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
    async updateUI() {
        // fetchData
        const items = (await this.getInfo(0))
        const view = items.map(this.getView).join('')
        this.wrapper.insertAdjacentHTML('beforeend', view)

        // updateUI
        // this.cleanUI()
        Array.from(this.wrapper.querySelectorAll('div.folder')).forEach(f => {
            f.addEventListener('click', async(e) => {
                const items = await this.self.getInfo(e.currentTarget.id)
                const view = items.map(this.getView).join('')
                this.self.cleanUI()
                this.wrapper.insertAdjacentHTML('beforeend', view)
            })
        })

        Array.from(this.wrapper.querySelectorAll('div.file')).forEach(f => {
            f.addEventListener('click', async(e) => {
                console.log(e.currentTarget.id)
                const items = await this.self.getInfo(e.currentTarget.id)
                const view = items.map(this.getView).join('')
                this.self.cleanUI()
                this.wrapper.insertAdjacentHTML('beforeend', view)
            })
        })
    }
}

(async()=> {
    const App = window.APP 
    const Api = window.API
    App.inject(finderLoader)
})();