const loader = (() => {
    let libName = ''
    let moduleName = ''
    let adaptorName = 'ADT/STORE'

    const load = () => {
        let listeners = []
        let state = {}
        return (() => {
            const getState = () => (state)
            const setState = (newState) => {
                state = { ...state, ...newState }
            }
            const addInstance = (module) => listeners.push(module)
            const notify = () => {
                listeners.forEach(l => l.render())
            }
            return {
                getState,
                setState,
                addInstance,
                notify
            }
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
