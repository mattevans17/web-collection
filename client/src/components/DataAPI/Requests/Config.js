const isDevMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

const config = {
    requestParams: {
        postJSON: data => ({
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: data ? JSON.stringify(data) : null
        })
    },

    url: isDevMode ? 'http://192.168.88.238:5000/' : '/',

    path: path => config.url + path
}


export default config