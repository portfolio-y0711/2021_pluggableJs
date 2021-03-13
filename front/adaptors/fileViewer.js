const loader = (() => {
    let adaptorName = 'ADT/FILEVIEWER'

    const load = (app) => {
        //closure: lexical scope
        // let pathFinder

        LOG(`ADT`, `${adaptorName}`, `Adaptor Loaded`)

        let store = app.adaptors.get('ADT/STORE')
        let api = app.adaptors.get('ADT/API')

        return (() => {
            //props (& functions)
            const open = async(id) => { 
                const { FINDER: { currentDir } } = store.getState()
                const file = (await api.get(currentDir)).filter(file => file.id === parseInt(id))[0]
                const blob = await api.getFile(file.filepath) 
                return blob
            } 
            return {
                //exporting props (& functions)
                open 
            }
        })()
    }

    return { adaptorName, load }
})();

export {
    loader
}