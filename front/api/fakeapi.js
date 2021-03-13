const loader = (() => {
    let adaptorName = 'ADT/API'
    let proxy

    const load = () => {
        LOG(`ADT`, `${adaptorName}`, `Adaptor Loaded`)

        let baseUrl = 'http://localhost:5000'
        return (() => {
            const get = async(path) => {
                if (path === 0 || path === 'root') {
                    return await new Promise(res => setTimeout(res, 1000, data.queryRoot))
                } else {
                    return await new Promise(res => setTimeout(res, 1000, data[`query${path}`]))
                }
            }
            const getFile = async(path) => {
                const response = await fetch(path)
                const blob = await response.blob()
                return blob
            }
            return {
                get,
                getFile,
            }
        })()
    }
    return { adaptorName, load }
})()

;(() => {

})()

export {
    loader
}

const data = {
    queryRoot: [
        {
            id: 1,
            type: 'DIRECTORY',
            title: 'monorepo',
            filepath: null,
            parent: 0
        }, 
        {
            id: 3,
            type: 'DIRECTORY',
            title: 'assets',
            filepath: null,
            parent: 0
        },
        {
            id: 4,
            type: 'FILE',
            title: 'mono.png',
            filepath: './assets/mono.png',
            parent: 1
        }, 
    ],
    query1: [
        {
            id: 11,
            type: 'FILE',
            title: 'README.md',
            filepath: './assets/not.jpg',
            parent: 1
        }, 
        {
            id: 12,
            type: 'FILE',
            title: 'package.json',
            filepath: './assets/not.jpg',
            parent: 1
        }, {
            id: 13,
            type: 'DIRECTORY',
            title: 'packages',
            filepath: null,
            parent: 1
        }

    ],
    query3: [
        {
            id: 31,
            type: 'FILE',
            title: 'walldog.jpg',
            filepath: './assets/walldog.jpg',
            parent: 3
        }, 
        {
            id: 32,
            type: 'FILE',
            title: 'kutecow.jpg',
            filepath: './assets/kutecow.jpg',
            parent: 3
        }
    ],
    query13: [
        {
            id: 131,
            type: 'DIRECTORY',
            title: 'front',
            filepath: null,
            parent: 13
        },
        {
            id: 132,
            type: 'DIRECTORY',
            title: 'back',
            filepath: null,
            parent: 13
        },
        {
            id: 133,
            type: 'DIRECTORY',
            title: 'types',
            filepath: null,
            parent: 13
        }
    ],
    query131: [
        {
            id: 1311,
            type: 'FILE',
            title: 'package.json',
            filepath: './assets/not.jpg',
            parent: 131
        }
    ],
    query132: [
        {
            id: 1321,
            type: 'FILE',
            title: 'tsconfig.json',
            filepath: './assets/not.jpg',
            parent: 132
        },
        {
            id: 1322,
            type: 'FILE',
            title: 'package.json',
            filepath: './assets/not.jpg',
            parent: 132
        }
    ],
    query133: [
        {
            id: 1331,
            type: 'FILE',
            title: 'tsconfig.json',
            filepath: './assets/not.jpg',
            parent: 133
        },
        {
            id: 1332,
            type: 'FILE',
            title: 'package.json',
            filepath: './assets/not.jpg',
            parent: 133
        }
    ]
}
