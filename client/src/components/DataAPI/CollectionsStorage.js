import Collections from './Requests/Collections'

let unsortedBookmarks = []

let collections = []

const loadCollections = onLoad => {
    Collections.loadCollections(data => {
        if (data.length) {
            data.forEach(collection => {
                if (collection.key === 'unsorted') {
                    unsortedBookmarks = collection.bookmarks
                } else {
                    collections.push(collection)
                }
            })
        }
        onLoad()
    })
}

const getCollectionByKey = key => {
    return collections.find(o => o.key === key)
}

const getCollectionNameByKey = key => {
    switch(key) {
        case 'all': return 'Все закладки'
        case 'unsorted': return 'Несортированные'
        default: return collections.find(o => o.key === key).name
    }
}

const getCollectionsList = () => {
    let collectionsList = []
    collections.forEach(c => collectionsList.push({key: c.key, name: c.name}))
    return collectionsList
}

const addCollection = collection => {
    collections.unshift({
        key: collection.key,
        name: collection.name,
        bookmarks: []
    })
    Collections.addCollection(collection.key, collection.name)
}


const getAllBookmarksFromAllCollections = () => {
    let bookmarks = unsortedBookmarks
    collections.forEach(collection => bookmarks = bookmarks.concat(collection.bookmarks))
    return bookmarks
}

const deleteBookmarksFromAllCollections = bookmarksIds => {
    unsortedBookmarks = unsortedBookmarks.filter(bookmark => {
        return !bookmarksIds.includes(bookmark.id)
    })
    collections.forEach(collection => {
        collection.bookmarks = collection.bookmarks.filter(bookmark => {
            return !bookmarksIds.includes(bookmark.id)
        })
    })
}


const addBookmarkToUnsorted = bookmark => {
    unsortedBookmarks.unshift(bookmark)
}

const getAllUnsortedBookmarks = () => {
    return [...unsortedBookmarks]
}

const getUnsortedBookmarks = bookmarksIds => {
    return unsortedBookmarks.filter((bookmark) => {
        return bookmarksIds.includes(bookmark.id)
    })
}

const deleteUnsortedBookmarks = bookmarksIds => {
    unsortedBookmarks = unsortedBookmarks.filter((bookmark) => {
        return !bookmarksIds.includes(bookmark.id)
    })
}


// FOR COLLECTIONS

const addBookmarkToCollection = (bookmark, collectionKey) => {
    getCollectionByKey(collectionKey).bookmarks.unshift(bookmark)
}

const getAllBookmarksFromCollection = collectionKey => {
    return [...getCollectionByKey(collectionKey).bookmarks]
}

const getBookmarksFromCollection = (bookmarksIds, collectionKey) => {
    return getCollectionByKey(collectionKey).bookmarks.filter((bookmark) => {
        return bookmarksIds.includes(bookmark.id)
    })
}

const deleteBookmarksFromCollection = (bookmarksIds, collectionKey) => {
    let collection = getCollectionByKey(collectionKey)
    collection.bookmarks = collection.bookmarks.filter((bookmark) => {
        return !bookmarksIds.includes(bookmark.id)
    })
}


const addBookmark = (bookmark, collectionKey) => {
    switch (collectionKey) {
        case 'all':
            addBookmarkToUnsorted(bookmark)
            Collections.addBookmark(bookmark, 'unsorted')
            break
        case 'unsorted':
            addBookmarkToUnsorted(bookmark)
            Collections.addBookmark(bookmark, 'unsorted')
            break
        default:
            addBookmarkToCollection(bookmark, collectionKey)
            Collections.addBookmark(bookmark, collectionKey)
    }
}

const addBookmarks = (bookmarks, collectionKey) => {
    switch (collectionKey) {
        case 'all':
            bookmarks.forEach(bookmark => {
                addBookmarkToUnsorted(bookmark)
            })
            break
        case 'unsorted':
            bookmarks.forEach(bookmark => {
                addBookmarkToUnsorted(bookmark)
            })
            break
        default:
            bookmarks.forEach(bookmark => {
                addBookmarkToCollection(bookmark, collectionKey)
            })
    }
}

const getAllBookmarks = collectionKey => {
    switch (collectionKey) {
        case 'all':
            return getAllBookmarksFromAllCollections()
        case 'unsorted':
            return getAllUnsortedBookmarks()
        default:
            return getAllBookmarksFromCollection(collectionKey)
    }
}

const deleteBookmarks = (bookmarksIds, collectionKey) => {
    switch (collectionKey) {
        case 'all':
            deleteBookmarksFromAllCollections(bookmarksIds)
            Collections.deleteBookmarksFromAllCollections(bookmarksIds)
            break
        case 'unsorted':
            deleteUnsortedBookmarks(bookmarksIds)
            Collections.deleteBookmarks(bookmarksIds, collectionKey)
            break
        default:
            deleteBookmarksFromCollection(bookmarksIds, collectionKey)
            Collections.deleteBookmarks(bookmarksIds, collectionKey)
    }
}

const moveBookmarks = (bookmarksIds, fromCollection, toCollection) => {
    let bookmarks;
    if (bookmarksIds.length === 0) return
    switch (fromCollection) {
        case 'all': return
        case 'unsorted':
            bookmarks = getUnsortedBookmarks(bookmarksIds)
            deleteUnsortedBookmarks(bookmarksIds)
            break
        default:
            bookmarks = getBookmarksFromCollection(bookmarksIds, fromCollection)
            deleteBookmarksFromCollection(bookmarksIds, fromCollection)
    }
    addBookmarks(bookmarks, toCollection)
    Collections.moveBookmarks(bookmarksIds, fromCollection, toCollection)
}

const clearAll = () => {
    collections = []
    unsortedBookmarks = []
}


export default {
    getCollectionsList, getCollectionNameByKey, addCollection, clearAll,
    addBookmark, getAllBookmarks, deleteBookmarks, moveBookmarks, loadCollections
}