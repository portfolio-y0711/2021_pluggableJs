const loader = (() => {
    let adaptorName = 'ADT/PATHFINDER'

    const load = () => {
        //closure: lexical scope
        // let pathFinder
        let store
        let api

        return (() => {
            //props (& functions)

            const injectAdaptorInstances = (adaptors) => {
                store = adaptors.get('ADT/STORE')
                api = adaptors.get('ADT/API')
            }

            const gotoPath = async(id) => {
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
                gotoPath,
            }
        })()
    }

    return {adaptorName, load}
})();

// class PathFinder {
//     store
//     constructor(store) {
//         this.store = store
//         console.log(store)
//     }
//     gotoPath() {

//     }
// }

/**
 * path scenario
 * 
 * parentPath: 0
 * currentPath: 0
 * 
 * pathQ: [0, 1, 3]
 * pathNameMap:[0 -> 'root'] [1 -> '까만 고양이'] [3 -> '2012년']
 * 
 * bread: renderInfo / pathQ + pathNameMap
 * 
 * gotoPrevPath() -> [0, > 1 <, 3]
 * 
 * gotoPath(1) -> indexOf pathQ [0, > 1 < , 3] => [0, 1] slice after 1
 * delete pathNameMap sliced [3] -> delete [3 -> '2021년']
 * 
 * parentPath: [0 <-,  > 1 <]
 * currentPath: > 1 <
 * 
 * pathQ.length == 0 => do nothing
 * pathQ > 0
 * 
 */


(() => {
    const app = window.APP

    if (app.appName === '2021_modular')  {
        app.injectAdaptorLoader(loader)
    }
})()