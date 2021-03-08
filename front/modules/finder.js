const finderLoader = () => new Finder()

class Finder {
    wrapper
    api
    constructor() {
        // constructor
        console.log('[MOD] (Finder) Init')
        this.api = window.API
        this.wrapper = document.querySelector('finder')
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
    async init() {
        // fetchData
        const items = (await this.getInfo(1))
        const view = items.map(this.getView).join('')
        this.wrapper.insertAdjacentHTML('beforeend', view)

        // updateUI
        // this.cleanUI()
        Array.from(this.wrapper.querySelectorAll('div.folder')).forEach(f => {
            f.addEventListener('click', (e) => {
                console.log(e.currentTarget.id)
            })
        })

        Array.from(this.wrapper.querySelectorAll('div.file')).forEach(f => {
            f.addEventListener('click', (e) => {
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