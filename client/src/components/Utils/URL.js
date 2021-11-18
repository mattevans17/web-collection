const getURLHost = URL => {
    if (URL.includes('://')) {
        URL = URL.slice(URL.indexOf('://') + 3, URL.length)
    }
    if (URL.includes('/')) {
        URL = URL.slice(0, URL.indexOf('/'))
    }
    return URL
}

const getFullURL = URL => {
    const protocols = ['http', 'https', 'ftp']
    const defaultProtocol = protocols[0]
    for (const protocol of protocols) {
        if (URL.startsWith(`${protocol}://`)) return URL
    }
    return `${defaultProtocol}://${URL}`
}

export {getURLHost, getFullURL}