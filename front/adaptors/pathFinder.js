const loader = (() => {
    let adaptorName = 'ADT/PATHFINDER'

    const load = () => {
        //closure: lexical scope
        // let pathFinder
        let store
        let api
        let mods

        return (() => {
            //props (& functions)

            const injectAdaptorInstances = async(adaptors) => {
                api = adaptors.get('ADT/API')
                store = adaptors.get('ADT/STORE')
                
                store.setState({
                    'finder': {
                        parentPath: 0,
                        currentPath: 0,
                        items: [] 
                    },
                    'bread': {
                        pathQue: [],
                        pathNameMap: new Map()
                    }
                })
            }

            const injectModuleInstances = (modules) => {
                mods = Array.from(modules).map(([moduleName, module]) => ({ moduleName, module }))
            }

            const goto = async(id) => {
                const { finder, bread } = store.getState()
                if (bread.pathQue.length === 1 || id === finder.currentPath) {
                    return
                }

                const idx = bread.pathQue.findIndex(e => e === id)
                const items = await api.get(id) 

                const [ rem, dump ] = [ bread.pathQue.slice(0, idx + 1), bread.pathQue.slice(idx + 1) ]
                
                dump.forEach(d => {
                    bread.pathNameMap.delete(d)
                })
                bread.pathQue = rem
                store.setState({
                    'finder': {
                        currentPath: id,
                        parentPath: rem[rem.length - 2],
                        items: items
                    },
                    'bread': {
                        pathQue: bread.pathQue,
                        pathNameMap: bread.pathNameMap
                    }
                })
                store.notify()
            }

            const outOfDir = async() => {
                const { finder, bread } = store.getState()
                if (finder.currentPath === 0) {
                    return 
                }
                const items = await api.get(finder.parentPath) 

                const keyToDelete = bread.pathQue.pop()
                bread.pathNameMap.delete(keyToDelete)

                store.setState({
                    'finder': {
                        currentPath: finder.parentPath,
                        parentPath: 0,
                        items: items
                    },
                    'bread': {
                        pathQue: bread.pathQue,
                        pathNameMap: bread.pathNameMap
                    }
                })
                store.notify()
            }

            const intoDir = async({ id, pathName }) => {
                const { finder, bread } = store.getState()
                const items = await api.get(id)

                bread.pathQue.push(id)
                bread.pathNameMap.set(id, pathName)

                store.setState({
                    'finder': {
                        currentPath: id,
                        parentPath: finder.currentPath,
                        items: items
                    },
                    'bread': {
                        pathQue: bread.pathQue,
                        pathNameMap: bread.pathNameMap
                    }
                })
                store.notify()
            }
            return {
                //exporting props (& functions)
                injectAdaptorInstances,
                outOfDir,
                intoDir,
                goto,
            }
        })()
    }

    return {adaptorName, load}
})();


(() => {
    const app = window.APP

    if (app.appName === '2021_modular')  {
        app.injectAdaptorLoader(loader)
    }
})()