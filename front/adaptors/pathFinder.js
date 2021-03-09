const loader = (() => {
    let adaptorName = 'ADT/PATHFINDER'

    const load = (appInstance) => {
        //closure: lexical scope
        // let pathFinder
        let app = appInstance
        let store
        let api

        return (() => {
            //props (& functions)
            const injectDependencyForPathFinder = ({storeInstance, apiInstance}) => {
                store = storeInstance
                api = apiInstance
            }

            const gotoPath = async() => {
                const { finder, bread } = store.getState()
            }

            const gotoPrevPath = async() => {
                const { finder, bread } = store.getState()
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

            const goIntoDir = async({ id, pathName }) => {
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
                injectDependencyForPathFinder,
                gotoPrevPath,
                goIntoDir,
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