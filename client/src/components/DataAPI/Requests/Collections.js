import config from "./Config"


function loadCollections(onResponse) {
    fetch(config.path('getCollections'))
        .then(response => response.json())
        .then(data => onResponse(data))
}

function addBookmark(bookmark, collectionKey, onResponse=null) {
    fetch(
        config.path('addBookmark'),
        config.requestParams.postJSON({
            bookmark: bookmark,
            collectionKey: collectionKey
        })
    )
        .then(response => response.json())
        .then(data => onResponse && onResponse(data))
}

function deleteBookmarks(bookmarksIds, collectionKey, onResponse=null) {
    fetch(
        config.path('deleteBookmarks'),
        config.requestParams.postJSON({
            bookmarksIds: bookmarksIds,
            collectionKey: collectionKey
        })
    )
        .then(response => response.json())
        .then(data => onResponse && onResponse(data))
}

function deleteBookmarksFromAllCollections(bookmarksIds, onResponse=null) {
    fetch(
        config.path('deleteBookmarksFromAllCollections'),
        config.requestParams.postJSON({
            bookmarksIds: bookmarksIds,
        })
    )
        .then(response => response.json())
        .then(data => onResponse && onResponse(data))
}

function moveBookmarks(bookmarksIds, fromCollection, toCollection, onResponse=null) {
    fetch(
        config.path('moveBookmarks'),
        config.requestParams.postJSON({
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
        config.path('addCollection'),
        config.requestParams.postJSON({
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
