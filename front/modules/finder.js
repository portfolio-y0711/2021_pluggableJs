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
        this.app.injectDependencyForPathFinder({
               storeInstance: this.app.getStore(),
               apiInstance: this.app.getApi()
        })

    }
    async render() {
        this.wrapper.innerHTML = ''
        const { 'finder': { items } } = this.app.getState()
        const buttonView = renderButtonView()
        const itemView = items.map(renderItemView).join('')
        this.wrapper.insertAdjacentHTML('beforeend', [buttonView, itemView].join(''))
        const [folder, file] = [[...this.wrapper.querySelectorAll('div.folder')], [...this.wrapper.querySelectorAll('div.file')]]

        document.getElementById('revert').addEventListener('click', (e) => {
            this.app.gotoPrevPath()
        })
        if (folder.length > 0) {
            folder.map(f => f.addEventListener('click', (e) => { 
                const [id, pathName] = [parseInt(e.currentTarget.id), e.currentTarget.querySelector('h1').textContent]
                this.app.goIntoDir({id, pathName}) 
            }))
        }
        if (file.length > 0) {
            file.map(f => f.addEventListener('click', (e) => { 
                console.log(e.currentTarget.id) 
            }))
        }
    }

    async componentDidMount() {
        const items = await this.app.get(0)
        this.app.setState({ 
            'finder': {
                parentPath: 0,
                currentPath: 0,
                items: items
            }
        })
        this.render()
    }
}

function renderButtonView() {
    const template = `
        <div id="revert">
            <div class="file">
                <i class="material-icons">arrow_left
                    <p class="cooltip">to previous</p>
                </i>
            </div>
        </div>
    `
    return template
}

function renderItemView({ id, type, title, filepath, parent }) {
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
