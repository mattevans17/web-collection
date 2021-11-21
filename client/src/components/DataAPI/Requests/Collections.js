import config from "./Config"


function loadCollections(onResponse) {
    fetch('/api/collections/get/')
        .then(response => response.json())
        .then(data => onResponse(data))
}

function addBookmark(bookmark, collectionKey, onResponse=null) {
    fetch(
        '/api/collections/add_bookmark/',
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
        '/api/collections/delete_bookmarks/',
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
        '/api/collections/delete_bookmarks_from_all/',
        config.requestParams.postJSON({
            bookmarksIds: bookmarksIds,
        })
    )
        .then(response => response.json())
        .then(data => onResponse && onResponse(data))
}

function moveBookmarks(bookmarksIds, fromCollection, toCollection, onResponse=null) {
    fetch(
        '/api/collections/move_bookmarks/',
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
        '/api/collections/add/',
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
