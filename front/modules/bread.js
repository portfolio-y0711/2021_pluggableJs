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
    constructor(app) {
       this.self = this
       this.app = app
       this.wrapper = document.querySelector('bread')
    }
    render() {
        this.wrapper.innerHTML = ''
        const { pathQue, pathNameMap } = this.props
        
        const breadView = renderBreadcrumbs(pathQue, pathNameMap)
        this.wrapper.insertAdjacentHTML('beforeend', breadView)
    }
}

function renderBreadcrumbs(pathQue, pathNameMap) {
    const handler = `window.APP.adaptors.get('ADT/PATHFINDER')`
    const renderList = ({id, name}) => `<li onclick="${handler}.goto(${id})" id=${id}><a href="#">${name}</a></li>`
    const lists = pathQue.map(q => 
        ({ id: q, name: pathNameMap[q] })
    )
    return (`
        <ol class="arrows">
            ${lists.map(renderList).join('')}
        </ol>
    `)
}

export {
    loader
}

