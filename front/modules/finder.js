const loader = (() => {
    let moduleName = 'FINDER'
    let moduleInfo = {
        props: {
            currentDir: undefined,
            parentDir: undefined,
            items: undefined
        }
    }
    const load = (app) => (LOG(`MOD`, `${moduleName}`, `Module Loaded`), new Finder(app))
    return { moduleName, moduleInfo, load }
})()

class Finder {
    self
    app
    props
    wrapper
    constructor(app) {
        this.self = this
        this.app = app
        this.wrapper = document.querySelector('finder')
    }
    async render() {
        this.wrapper.innerHTML = ''
        const { items, parentDir } = this.props

        if (items === undefined) {
            return
        } else {
            const buttonView = renderButtonView()
            const itemView = items.map(renderItemView).join('')
            this.wrapper.insertAdjacentHTML('beforeend', [buttonView, itemView].join(''))
            const [folder, file] = [[...this.wrapper.querySelectorAll('div.folder')], [...this.wrapper.querySelectorAll('div.file')]]

            document.getElementById('revert').addEventListener('click', (e) => {
                this.app.outOfDir()
            })

            if (folder.length > 0) {
                folder.map(f => f.addEventListener('click', (e) => {
                    const [id, pathName] = [parseInt(e.currentTarget.id), e.currentTarget.querySelector('h1').textContent]
                    this.app.intoDir({id, pathName})
                }))
            }
            if (file.length > 0) {
                file.map(f => f.addEventListener('click', (e) => {
                    console.log(e.currentTarget.id)
                }))
            }
        }
    }

    async componentDidMount() {
        await this.app.intoDir({ id: 0, pathName: 'Root'})
    }
}

function renderButtonView() {
    const template = `
        <div id="revert">
            <div class="revert">
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

export {
    loader
}