const finderLoader = () => new Finder()

class Finder {
    constructor() {
        // constructor
        console.log('[MOD] (Finder) Init')
        this.init()
    }
    async init() {
        console.log('init')
        const wrapper = document.querySelector('finder')
        const Api = window.API
        // fetchData
        const folder = (await Api.get('root'))[0]
        const file = (await Api.get('1'))[0]
        // console.log(folder)
        // fetchData


        // updateUI
        const template = (data) => {
            const { id, type } = data
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
                    <h1>Projects</h1>
                </div> 
            `)
        }
        wrapper.insertAdjacentHTML('beforeend',template(folder))
        wrapper.insertAdjacentHTML('beforeend',template(file))
        // updateUI

        // cleanUI
        // cleanUI
    }
}

(async()=> {
    const App = window.APP 
    const Api = window.API
    App.inject(finderLoader)
})();