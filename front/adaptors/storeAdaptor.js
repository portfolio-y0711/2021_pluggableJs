const loader = (() => {
    let libName = ''
    let moduleName = ''
    let adaptorName = 'ADT/STORE'

    const load = (app) => {
        let reducers = []
        let store

        function combineReducers() { 
            const reducerKeys = Object.keys(reducers)
            const finalReducers = {}
            for (let i = 0; i < reducerKeys.length; i++) {
                const key = reducerKeys[i]

                if (typeof reducers[key] === 'function') {
                    finalReducers[key] = reducers[key]
                }
            }
            const finalReducersKey = Object.keys(finalReducers)

            return function combination(state, action) {
                let hasChanged = false
                const nextState = {}
                for (let i = 0; i < finalReducerKeys.length; i++) {
                    const key = finalReducerKeys[i]
                    const reducer = finalReducers[key]
                    const previousStateForKey = state[key]
                    const nextStateForKey = reducer(previousstateForKey, action)
                    nextState[key] = nextStateForKey
                    hasChanged = hasChanged || nextStateForKey !== previousStateForKey
                }
                hasChanged = hasChanged || finalReducers.length !== Object.keys(state).length
                return hasChanged ? nextState: state
            }
        }

        return(() => ({
            assignReducer: (reducer) => {
                reducers.push(reducer)
            },
            createStore: () => {
                const reducer = combineReducers()
                let state
                const listeners = []

                function getState() {
                    return state
                }

                function dispatch(action) {
                    state = reducer(state, action)
                    listeners.forEach((callback) => {
                        callback()
                    })
                    return action
                }

                function subscribe(listener) {
                    listeners.push(listener)
                    return () => {
                        listeners.splice(listeners.indexOf(listener), 1)
                    }
                }
                app.store = ({
                    getState,
                    subscribe,
                    dispatch,
                    state,
                    listeners
                })
                return app.store
            }

        }))()
    }
    return {libName, moduleName, adaptorName, load}
})();
(() => {
    const app = window.APP
    if (app.appName === '2021_modular') {
        app.injectAdaptorLoader(loader)
    }
})()
