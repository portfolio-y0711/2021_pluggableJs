const loader = (() => {
    let libName = ''
    let moduleName = 'BREAD'
    const load = (app) => new Bread(app)
    return {libName, moduleName, load}
})()

class Bread {
    self
    app
    wrapper
    constructor(app) {
       this.self = this
       this.app = app
       this.wrapper = document.querySelector('bread')
       this.app.addState({
           'bread': {
               pathQue: [0],
               pathNameMap: new Map([[0, 'Root']])
           }
       })
    }
    render() {
        this.wrapper.innerHTML = ''
        const { 'bread': { pathQue, pathNameMap } } = this.app.getState()
        const ol = document.createElement('ol')
        ol.classList.add('arrows')
        const template = (id, name) => `<li><a id=${id} href="#">${name}</a></li>`
        const breadView = pathQue.map(q => template(q, pathNameMap.get(q))).join('')
        ol.insertAdjacentHTML('beforeend', breadView)
        this.wrapper.appendChild(ol)
    }
    componentDidMount(){}
}


(() => {
    const app = window.APP
    if (app.appName === '2021_modular') {
        app.injectModuleLoader(loader)
    }
})()
