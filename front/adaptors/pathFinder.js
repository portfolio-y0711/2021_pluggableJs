const loader = (() => {
    let adaptorName = 'ADT/PATHFINDER'

    const load = (app) => {
        //closure: lexical scope
        // let pathFinder

        LOG(`ADT`, `${adaptorName}`, `Adaptor Loaded`)

        let store = app.adaptors.get('ADT/STORE')
        let api = app.adaptors.get('ADT/API')

        return (() => {
            //props (& functions)
            const goto = async(id) => {
                const { FINDER: { currentDir, parentDir }, BREAD: { pathQue, pathNameMap } } = store.getState()
                if (pathQue.length === 1 || id === currentDir) {
                    return
                }
                const idx = pathQue.findIndex(e => e === id)
                const items = await api.get(id) 
                const [ newPathQue, pathQueToDelete ] = [ pathQue.slice(0, idx + 1), pathQue.slice(idx + 1) ]
                
                pathQueToDelete.forEach(pathName => {
                    delete pathNameMap[pathName]
                })

                store.setState({
                    'FINDER': {
                        currentDir: id,
                        parentDir: newPathQue[newPathQue.length - 2],
                        items: items
                    },
                    'BREAD': {
                        pathQue: [...newPathQue],
                        pathNameMap: pathNameMap
                    }
                })
                const { FINDER: { currentDir: _currentDir, parentDir: _parentDir }, BREAD: { pathQue: _pathQue, pathNameMap: _pathNameMap } } = store.getState()
                LOG('','', `\n# goto(${id})\n\ncurrentDir: ${_currentDir}\nparentDir: ${_parentDir}\npathQue: ${_pathQue}\npathNameMap: ${JSON.stringify(_pathNameMap)}`)
            }

            const outOfDir = async() => {
                const { FINDER: { currentDir, parentDir }, BREAD: { pathQue, pathNameMap } } = store.getState()
                if (currentDir === 0) {
                    return 
                }
                const items = await api.get(parentDir)
                const keyToDelete = pathQue.pop()
                delete pathNameMap[keyToDelete]

                store.setState({
                    'FINDER': {
                        currentDir: parentDir,
                        parentDir: pathQue[pathQue.length - 2],
                        items: [...items]
                    },
                    'BREAD': {
                        pathQue: pathQue,
                        pathNameMap: pathNameMap
                    }
                })
                const { FINDER: { currentDir: _currentDir, parentDir: _parentDir }, BREAD: { pathQue: _pathQue, pathNameMap: _pathNameMap } } = store.getState()
                LOG('','', `\n# outOfDir()\n\ncurrentDir: ${_currentDir}\nparentDir: ${_parentDir}\npathQue: ${_pathQue}\npathNameMap: ${JSON.stringify(_pathNameMap)}`)
            }

            const intoDir = async({ id, pathName }) => {
                const { FINDER: { currentDir, parentDir }, BREAD: { pathQue, pathNameMap } } = store.getState()
                const items = await api.get(id)
                
                store.setState({
                    'FINDER': {
                        currentDir: id,
                        parentDir: currentDir,
                        items: [...items]
                    },
                    'BREAD': {
                        pathQue: [...pathQue, id],
                        pathNameMap: { ...pathNameMap, ...{ [`${id}`]: pathName } }
                    }
                })
                const { FINDER: { currentDir: _currentDir, parentDir: _parentDir }, BREAD: { pathQue: _pathQue, pathNameMap: _pathNameMap } } = store.getState()
                LOG('','', `\n# intoDir(${id}, ${pathName})\n\ncurrentDir: ${_currentDir}\nparentDir: ${_parentDir}\npathQue: ${_pathQue}\npathNameMap: ${JSON.stringify(_pathNameMap)}`)
            }
            return {
                //exporting props (& functions)
                outOfDir,
                intoDir,
                goto
            }
        })()
    }

    return { adaptorName, load }
})();

export {
    loader
}