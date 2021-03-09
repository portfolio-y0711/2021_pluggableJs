const loader = (() => {
    let libName = ''
    let moduleName = ''
    let adaptorName = 'ADT/STORE'

    const load = () => {
        let listeners = []
        let state = {}
        return (() => {
            const addInstance = (module) => listeners.push(module)
            const getState = () => (state)
            const setState = (newState) => { state = { ...state, ...newState } }
            const notify = () => { listeners.forEach(l => l.render()) }
            const getStore = () => ({ getState, setState, addInstance, notify })
            return { getState, setState, addInstance, notify, getStore }
        })()
    }

    return {libName, moduleName, adaptorName, load}
})();

(() => {
    const app = window.APP
    if (app.appName === '2021_modular') {
        app.injectAdaptorLoader(loader)
    }
})()
