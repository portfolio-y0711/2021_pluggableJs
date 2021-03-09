const loader = (() => {
    let adaptorName = 'ADT/STORE'

    const load = () => {
        let listeners = []
        let state = {}
        return (() => {
            const injectModuleInstance = (module) => listeners.push(module)
            const getState = () => (state)
            const setState = (newState) => { state = { ...state, ...newState } }
            const notify = () => { listeners.forEach(l => l.render()) }
            const getStore = () => ({ getState, setState, notify })
            return { getState, setState, injectModuleInstance, notify, getStore }
        })()
    }

    return { adaptorName, load }
})();

(() => {
    const app = window.APP
    if (app.appName === '2021_modular') {
        app.injectAdaptorLoader(loader)
    }
})()
