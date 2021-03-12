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
        
        const ol = document.createElement('ol')
        ol.classList.add('arrows')
        const template = (id, name) => `<li id=${id}><a href="#">${name}</a></li>`
        const breadView = pathQue.map(q => template(q, pathNameMap[q])).join('')
        ol.insertAdjacentHTML('beforeend', breadView)
        this.wrapper.appendChild(ol)
        
        const breadcrumbs = Array.from(this.wrapper.querySelectorAll('li'))
        breadcrumbs.forEach(li => {
            li.addEventListener('click', async(e) => {
                this.app.goto(parseInt(e.currentTarget.id))
            })
        })
    }
}

export {
    loader
}

