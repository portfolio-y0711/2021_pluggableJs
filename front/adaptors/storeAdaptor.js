const loader = (() => {
    let adaptorName = 'ADT/STORE'

    const load = (app) => {
        //closure: lexical scope
        // let pathFinder
        LOG(`ADT`, `${adaptorName}`, `Adaptor Loaded`)

        const listeners = [...app.modules].reduce((acc, [moduleName, module]) =>
            // (acc.push(module), acc))
            Object.assign(acc, { [`${moduleName}`]: module })
            , {})

        let state = [...app.loaders.get('modules')]
            .reduce((acc, [loaderName, { moduleInfo: { props } }]) =>{
                app.modules.get(loaderName).props = props
                return Object.assign(acc, {...(acc[`${loaderName}`] = props)})
            }
            , {})

        return (() => {
            //props (& functions)
            const notify = () => {
                let module
                Object.keys(listeners).forEach(name => {
                    module = listeners[name]
                    module.props = state[name]
                    module.render()
                })
            }
            const getStore = () => ({ getState, setState, notify })
            const getState = () => (state)
            const setState = (newState) => {
                state = { ...state, ...newState }
                notify()
            }
            return {
                //exporting props (& functions)
                getState, setState, notify, getStore }
        })()
    }


    return { adaptorName, load }
})();

export {
    loader
}