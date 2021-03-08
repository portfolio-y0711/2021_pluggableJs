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
    constructor(app) {
        this.self = this
        this.app = app
        this.wrapper = document.querySelector('finder')
        this.app.addState({
            'finder': {
                parentPath: 0,
                currentPath: 0,
                items: []
            }
        })
    }
    async render() {
        this.wrapper.innerHTML = ''
        const { 'finder': { items } } = this.app.getState()
        const views = items.map(itemView).join('')
        this.wrapper.insertAdjacentHTML('beforeend', views)
        const [folder, file] = [[...this.wrapper.querySelectorAll('div.folder')], [...this.wrapper.querySelectorAll('div.file')]]
        if (folder.length > 0) {
            folder.map(f => f.addEventListener('click', (e) => { 
                const id = e.currentTarget.id
                const pathName = e.currentTarget.querySelector('h1').textContent
                this.updatePath(id, pathName) 
            }))
        }
        if (file.length > 0) {
            file.map(f => f.addEventListener('click', (e) => { 
                console.log(e.currentTarget.id) 
            }))
        }
    }
    async updatePath(id, pathName) {
        const items = await this.app.get(id)
        const { finder, bread } = this.app.getState()
        
        bread.pathQue.push(id)
        bread.pathNameMap.set(id, pathName)

        this.app.setState({
            'bread': {
                pathQue: bread.pathQue,
                pathNameMap: bread.pathNameMap
            }
        })
        let res = this.app.getState().bread
        this.app.notify()
    }
    async componentDidMount() {
        const { finder } = this.app.getState()
        const items = await this.app.get(finder.currentPath)
        console.log(items)
        this.app.setState({ 'finder': {
            items: items
        }})
        console.log(this.app.getState(items).finder)
        this.render()
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
        <div id="${id}" class="${props.get('className')}">
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
