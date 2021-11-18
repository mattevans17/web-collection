function requestPostJSONOptions(data) {
    return {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
}

const backendURL = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ?
    'http://192.168.88.238:5000' : null

function getPath(path) {
    return backendURL ? `http://192.168.88.238:5000/${path}` : path
}


function loadCollections(onResponse) {
    fetch(
        getPath('getCollections'),
        requestPostJSONOptions('')
    )
        .then(response => response.json())
        .then(data => onResponse(data))
}

function addBookmark(bookmark, collectionKey, onResponse=null) {
    fetch(
        getPath('addBookmark'),
        requestPostJSONOptions({
            bookmark: bookmark,
            collectionKey: collectionKey
        })
    )
        .then(response => response.json())
        .then(data => onResponse && onResponse(data))
}

function deleteBookmarks(bookmarksIds, collectionKey, onResponse=null) {
    fetch(
        getPath('deleteBookmarks'),
        requestPostJSONOptions({
            bookmarksIds: bookmarksIds,
            collectionKey: collectionKey
        })
    )
        .then(response => response.json())
        .then(data => onResponse && onResponse(data))
}

function deleteBookmarksFromAllCollections(bookmarksIds, onResponse=null) {
    fetch(
        getPath('deleteBookmarksFromAllCollections'),
        requestPostJSONOptions({
            bookmarksIds: bookmarksIds,
        })
    )
        .then(response => response.json())
        .then(data => onResponse && onResponse(data))
}

function moveBookmarks(bookmarksIds, fromCollection, toCollection, onResponse=null) {
    fetch(
        getPath('moveBookmarks'),
        requestPostJSONOptions({
            bookmarksIds: bookmarksIds,
            fromCollection: fromCollection,
            toCollection: toCollection
        })
    )
        .then(response => response.json())
        .then(data => onResponse && onResponse(data))
}

function addCollection(key, name, onResponse) {
    fetch(
        getPath('addCollection'),
        requestPostJSONOptions({
            key: key,
            name: name,
        })
    )
        .then(response => response.json())
        .then(data => onResponse && onResponse(data))
}

export default {
    loadCollections, addBookmark, deleteBookmarks,
    moveBookmarks, deleteBookmarksFromAllCollections, addCollection
}
