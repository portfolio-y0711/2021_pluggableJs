const loader = (() => {
    let adaptorName = 'ADT/HANDLER'

    const load = (app) => {
        //closure: lexical scope
        // let pathFinder

        LOG(`ADT`, `${adaptorName}`, `Adaptor Loaded`)

        let pathFinder = app.adaptors.get('ADT/PATHFINDER')
        let fileViewer = app.adaptors.get('ADT/FILEVIEWER')

        ;[...app.modules].forEach(([moduleName, module]) => {
            module.handler = `window.APP.adaptors.get('${adaptorName}')`
        })

        return (() => {
            //props (& functions)
            const goto = (id) => pathFinder.goto(id)
            const outOfDir = () => pathFinder.outOfDir()
            const intoDir = ({ id, pathName }) => pathFinder.intoDir({ id, pathName })
            const open = async(id) => await fileViewer.open(id) 
            
            
            return {
                //exporting props (& functions)
               goto,
               outOfDir,
               intoDir,
               open,
            }
        })()
    }

    return { adaptorName, load }
})();

export {
    loader
}