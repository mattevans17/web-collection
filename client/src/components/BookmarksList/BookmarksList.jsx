import classes from './BookmarksList.module.sass'
import {useEffect, useContext, useState, useCallback, useRef} from 'react'
import Bookmark from '../Bookmark/Bookmark'
import {MainContext} from '../Main/MainContext'
import {Context} from "../Home/Context"
import CollectionsStorage from '../DataAPI/CollectionsStorage'


const listStatus = {
    notFound: 'Ничего не найдено!',
    empty: 'Здесь пока нет закладок'
}

const BookmarksList = () => {
    const mainContext = useContext(MainContext)
    const context = useContext(Context)
    const buttonPressTimer = useRef(null)
    const wasLongPressDesktop = useRef(false)
    const [bookmarks, setBookmarks] = useState([])
    const [currentListStatus, setCurrentListStatus] = useState(listStatus.empty)
    const [selectedBookmarksIds, setSelectedBookmarksIds] = useState([])

    mainContext.setIsEmptyCollection(bookmarks.length === 0)


    useEffect(() => {
        CollectionsStorage.loadCollections(() => {
            setBookmarks(CollectionsStorage.getAllBookmarks(context.currentCollectionKey))
            mainContext.setIsLoading(false)
        })
    }, [])


    useEffect(() => {
        if (!mainContext.bookmarksSelection) {
            setSelectedBookmarksIds([])
        }
    }, [mainContext.bookmarksSelection])


    useEffect(() => {
        setCurrentListStatus(mainContext.searchValue !== '' ?
            listStatus.notFound : listStatus.empty
        )
        setBookmarks(CollectionsStorage.getAllBookmarks(context.currentCollectionKey).filter(bookmark => {
            for (const value of [bookmark.title, bookmark.url, bookmark.date, bookmark.time]) {
                if (value.toLowerCase().includes(mainContext.searchValue.toLowerCase())) {
                    return true
                }
            }
            return false
        }))
    }, [mainContext.searchValue])


    useEffect(() => {
        !mainContext.isSearchActive && setBookmarks(CollectionsStorage.getAllBookmarks(context.currentCollectionKey))
    }, [mainContext.isSearchActive])


    useEffect(() => {
        if (mainContext.shouldDeleteBookmark) {
            CollectionsStorage.deleteBookmarks(selectedBookmarksIds, context.currentCollectionKey)
            setBookmarks(CollectionsStorage.getAllBookmarks(context.currentCollectionKey))
            mainContext.setIsEmptyCollection(bookmarks.length === 0)
            setSelectedBookmarksIds([])
            mainContext.setShouldDeleteBookmark(false)
            mainContext.setBookmarksSelection(false)
            mainContext.setIsSearchActive(false)
            mainContext.setSearchValue('')
        }
    }, [mainContext.shouldDeleteBookmark])


    useEffect(() => {
        if (mainContext.newBookmark) {
            CollectionsStorage.addBookmark(mainContext.newBookmark, context.currentCollectionKey)
            mainContext.setIsEmptyCollection(true)
            mainContext.setIsAddBookmarkFormOpen(false)
            mainContext.setNewBookmark(null)
            if (context.currentCollectionKey === 'all') {
                context.setCurrentCollectionKey('unsorted')
            } else {
                setBookmarks([mainContext.newBookmark, ...bookmarks])
            }
        }
    }, [mainContext.newBookmark])


    useEffect(() => {
        if (mainContext.newCollection) {
            CollectionsStorage.addCollection(mainContext.newCollection)
            context.setCurrentCollectionKey(mainContext.newCollection.key)
            setBookmarks([])
            mainContext.setIsAddCollectionFormOpen(false)
            mainContext.setNewCollection(null)
        }
    }, [mainContext.newCollection])


    useEffect(() => {
        mainContext.setSelectedBookmarkNumber(selectedBookmarksIds.length)
    }, [selectedBookmarksIds])


    useEffect(() => {
        setBookmarks(CollectionsStorage.getAllBookmarks(context.currentCollectionKey))
    }, [context.currentCollectionKey])


    useEffect(() => {
        if (mainContext.shouldMoveBookmark) {
            CollectionsStorage.moveBookmarks(
                selectedBookmarksIds,
                context.currentCollectionKey,
                mainContext.moveBookmarksTo
            )
            mainContext.setBookmarksSelection(false)
            mainContext.setIsSearchActive(false)
            context.setCurrentCollectionKey(mainContext.moveBookmarksTo)
        }
        mainContext.setShouldMoveBookmark(false)
    }, [mainContext.shouldMoveBookmark])


    const toggleBookmarkSelection = useCallback(bookmarkId => {
        setSelectedBookmarksIds(selectedBookmarksIds.includes(bookmarkId) ?
            selectedBookmarksIds.filter(elem => elem !== bookmarkId) : [...selectedBookmarksIds, bookmarkId]
        )
    }, [selectedBookmarksIds])


    const handleClick = (event, bookmarkId) => {
        if (mainContext.bookmarksSelection) {
            event.preventDefault()
            wasLongPressDesktop.current ?
                wasLongPressDesktop.current = false :
                toggleBookmarkSelection(bookmarkId)
        }
    }

    const handleLongPress = (bookmarkId) => {
        mainContext.setBookmarksSelection(true)
        toggleBookmarkSelection(bookmarkId)
    }


    // FOR TOUCH DEVICES
    const handleTouchStart = bookmarkId => {
        buttonPressTimer.current = setTimeout(() => handleLongPress(bookmarkId), 400)
    }


    const handleTouchEnd = () => {
        clearTimeout(buttonPressTimer.current)
    }


    const handleTouchMove = () => {
        clearTimeout(buttonPressTimer.current)
    }


    // FOR DESKTOP
    const handleMouseDown = bookmarkId => {
        buttonPressTimer.current = setTimeout(() => {
            handleLongPress(bookmarkId)
            wasLongPressDesktop.current = true
        }, 400)
    }


    const handleMouseUp = () => {
        clearTimeout(buttonPressTimer.current)
    }


    return (
        <div className={classes.BookmarksList}>
            {bookmarks.length ? 
                bookmarks.map(bookmark =>
                    <Bookmark 
                        bookmark={bookmark}
                        key={bookmark.id}
                        isSelected={selectedBookmarksIds.includes(bookmark.id)}
                        onClick={event => handleClick(event, bookmark.id)}
                        onContextMenu={e => e.preventDefault()}

                        onTouchStart={() => handleTouchStart(bookmark.id)}
                        onTouchEnd={handleTouchEnd}
                        onTouchMove={handleTouchMove}

                        onMouseDown={() => handleMouseDown(bookmark.id)}
                        onMouseUp={handleMouseUp}
                    />
                ) : <div className={classes.Msg}>{currentListStatus}</div>
            }
        </div>
    )
}

export default BookmarksList