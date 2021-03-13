const loader = (() => {
    let moduleName = 'MODAL'
    let moduleInfo = {
        props: {
            pathQue: [],
            pathNameMap: {}
        }
    }
    const load = (app) => (LOG(`MOD`, `${moduleName}`, `Module Loaded`), new Modal(app))
    return { moduleName, moduleInfo, load }
})()

class Modal {
    self
    app
    props
    wrapper
    handler
    constructor(app) {
       this.self = this
       this.app = app
       this.wrapper = document.querySelector('modal')
    }
    render() {
        this.wrapper.innerHTML = ''

        const modalView = (`
            <div id="myModal" data-itemtype="modal" class="modal" onclick="document.getElementById('myModal').style.display='none'">
                <img class="modal-content" height="400" width="600">
                <div id="caption"></div>
            </div>
        `)
        
        this.wrapper.insertAdjacentHTML('beforeend', modalView)
    }
    showModal(blob) {
        const modal = this.wrapper.querySelector('[data-itemtype="modal"')
        const modalImg = this.wrapper.querySelector('img')
        modal.style.display = "block"
        modalImg.src = URL.createObjectURL(blob) 
        modalImg.style.border = 0
    }
}

export {
    loader
}

