const loader = (() => {
    let moduleName = 'BREAD'
    let moduleInfo = {
        props: {
            pathQue: [],
            pathNameMap: {}
        }
    }
    const load = (app) => (LOG(`MOD`, `${moduleName}`, `Module Loaded`), new Bread(app))
    return { moduleName, moduleInfo, load }
})()

class Bread {
    self
    app
    props
    wrapper
    handler
    constructor(app) {
       this.self = this
       this.app = app
       this.wrapper = document.querySelector('bread')
    }
    render() {
        this.wrapper.innerHTML = ''
        const { pathQue, pathNameMap } = this.props

        const renderList = ({id, name}) => `<li onclick="${this.handler}.goto(${id})" id=${id}><a href="#">${name}</a></li>`
        const lists = pathQue.map(q => 
            ({ id: q, name: pathNameMap[q] })
        )
        const breadView = (`
            <ol class="arrows">
                ${lists.map(renderList).join('')}
            </ol>
        `)
        
        this.wrapper.insertAdjacentHTML('beforeend', breadView)
    }
}

export {
    loader
}

