const loader = (() => {
    let libName = ''
    let moduleName = 'FINDER'
    const load = (app) => new Finder(app)
    return {libName, moduleName, load}
})()

class Finder {
    self
    app
    wrapper
    state 
    store
    constructor(app) {
        this.self = this
        this.app = app
        this.wrapper = document.querySelector('finder')
        this.state = {
            currentPath: 0,
            currentPathName: 'Root'
        }
        this.app.assignReducer((state = {'finder': this.state}, action) => {
            return ({
                ...state
            })
        })
    }
    async render() {
        this.wrapper.innerHTML = ''
        const { currentPath, currentPathName } = this.state
        const items = await this.app.get(currentPath)
        const views = items.map(itemView).join('')
        this.wrapper.insertAdjacentHTML('beforeend', views)
        
    }
}

function itemView({ id, type, title, filepath, parent }) {
    const props = new Map()
    if (type === 'DIRECTORY') {
        props.set('className', 'folder')
        props.set('icon', 'folder')
    } else if (type === 'FILE') {
        props.set('className', 'file')
        props.set('icon', 'file_present')
    } else {
        throw Error('ITEM TYPE ERROR')
    }
    return (` 
        <div class="${props.get('className')}">
            <i class="material-icons">${props.get('icon')}
                <p class="cooltip">0 folders / 0 files</p>
            </i>
            <h1>${title}</h1>
        </div> 
    `)
}

(() => {
    const app = window.APP
    if (app.appName === '2021_modular')  {
        app.injectModuleLoader(loader)
    }
})()
