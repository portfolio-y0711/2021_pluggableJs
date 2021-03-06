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
    handler
    modal
    wrapper
    constructor(app) {
        this.self = this
        this.app = app
        this.wrapper = document.querySelector('finder')
        this.modal = document.getElementById('myModal')
        this.modalImg = document.getElementById("img01")
    }
    async openFile({ id }) {
        const blob = await this.app.open(id)
        this.modal.showModal(blob)
    }
    render() {
        this.wrapper.innerHTML = ''
        const { items, parentDir } = this.props

        if (items === undefined) {
            return
        } else {
            const _items = items.map(({ id, type, title, filepath, parent }) => {
                const props = {}
                if (type === 'DIRECTORY') {
                    props['className'] = 'folder'
                    props['icon'] = 'folder'
                    props['method'] = 'intoDir'
                } else if (type === 'FILE') {
                    props['className'] = 'file'
                    props['icon'] = 'file_present'
                    props['method'] = 'open'
                } else {
                    throw Error('ITEM TYPE ERROR')
                }
                return { ...props, id, title, type }
            })

            const itemView = (item => {
                return (`<div id="${item.id}" onclick=";('${item.type}' === 'FILE') ? window.APP.modules.get('FINDER').openFile({ id: ${item.id} }) : ${this.handler}.${item.method}({ id: ${item.id}, pathName: '${item.title}' })" class="${item.className}">
                    <i class="material-icons">${item.icon}
                        <p class="cooltip">0 folders / 0 files</p>
                    </i>
                    <h1>${item.title}</h1>
                </div>`)
            })
            
            const finderView = (
                `<div id="revert" onclick="${this.handler}.outOfDir()">
                    <div class="revert">
                        <i class="material-icons">arrow_left
                            <p class="cooltip">to previous</p>
                        </i>
                    </div>
                </div>
                ${_items.map(itemView).join('')}
            `)

            this.wrapper.insertAdjacentHTML('beforeend', finderView)
            const [folder, file] = [[...this.wrapper.querySelectorAll('div.folder')], [...this.wrapper.querySelectorAll('div.file')]]
        }
    }

    componentDidMount() {
        this.app.intoDir({id: 0, pathName: 'Root' })
    }
}

export {
    loader
}