
(async()=> {
    const App = window.APP 
    const Api = window.API
    console.log('[MOD] (Finder) Init')
    const wrapper = document.querySelector('finder')
    const folder = (await Api.get('root'))[0]
    const file = (await Api.get('1'))[0]
    const template = (type) => {
        const [filetype, icon] = 
            (type === 'DIRECTORY') 
            ? ['folder', 'folder']
            : (type === 'FILE')
                ? ['file', 'file_present']
                : ['', '']
        return (`
            <div class="${filetype}">
                <i class="material-icons">${icon}
                    <p class="cooltip">0 folders / 0 files</p>
                </i>
                <h1>Projects</h1>
            </div> 
        `)
    }
    wrapper.insertAdjacentHTML('beforeend',template(folder.type))
    wrapper.insertAdjacentHTML('beforeend',template(file.type))
    
})();