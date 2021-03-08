class Api {
    constructor(baseUrl) {
        console.log('[API] Module: Api Created')
        this.baseUrl = baseUrl || 'http://localhost:5000'
    }
    async get(path) {
        if (path === 'root' || path === 0) {
            return await new Promise(res => setTimeout(res, 500, data.queryRoot))
            
        } else {
            return await new Promise(res => setTimeout(res, 500, data[`query${path}`]))
        }
    }
}


(() => {
    window.API = new Api()
})();

const data = {
    queryRoot: [
        {
            id: 1,
            type: 'DIRECTORY',
            title: '까만 고양이',
            filepath: null,
            parent: null
        }, {
            id: 3,
            type: 'DIRECTORY',
            title: '노란 고양이',
            filepath: null,
            parent: null
        }
    ],
    query1: [
        {
            id: 10,
            type: 'FILE',
            title: '고양이 장난감',
            filepath: './assets/toy.png',
            parent: 1
        }, {
            id: 11,
            type: 'FILE',
            title: '고양이 산책중',
            filepath: './assets/inthepark.png',
            parent: 1
        }
    ],
    query3: [
        {
            id: 12,
            type: 'FILE',
            title: '노랭이',
            filepath: './assets/yello.png',
            parent: 1
        }, {
            id: 13,
            type: 'FILE',
            title: '솜사탕',
            filepath: './assets/cottoncandy.png',
            parent: 1
        }
    ]
}

module.exports = data
