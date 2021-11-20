import {createContext, useState} from 'react'

const MainContext = createContext()

const MainContextProvider = ({children}) => {
    const [isMenuActive, setIsMenuActive] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [isAddBookmarkFormOpen, setIsAddBookmarkFormOpen] = useState(false)
    const [isAddCollectionFormOpen, setIsAddCollectionFormOpen] = useState(false)
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [newBookmark, setNewBookmark] = useState(null)
    const [bookmarksSelection, setBookmarksSelection] = useState(false)
    const [shouldDeleteBookmark, setShouldDeleteBookmark] = useState(false)
    const [selectedBookmarkNumber, setSelectedBookmarkNumber] = useState(0)
    const [isEmptyCollection, setIsEmptyCollection] = useState(true)
    const [shouldMoveBookmark, setShouldMoveBookmark] = useState(false)
    const [moveBookmarksTo, setMoveBookmarksTo] = useState()
    const [newCollection, setNewCollection] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const toggleMenu = () => {
        setIsMenuActive(!isMenuActive)
        isAddCollectionFormOpen && setIsAddCollectionFormOpen(false)
    }
    const toggleAddBookmarkForm = () => {
        !isAddBookmarkFormOpen && setIsSearchActive(false)
        isAddCollectionFormOpen && setIsAddCollectionFormOpen(false)
        setIsAddBookmarkFormOpen(!isAddBookmarkFormOpen)
    }
    const toggleAddCollectionForm = () => {
        !isAddCollectionFormOpen && setIsMenuActive(false)
        isAddBookmarkFormOpen && setIsAddBookmarkFormOpen(false)
        setIsAddCollectionFormOpen(!isAddCollectionFormOpen)
    }
    const toggleSearch = () => {
        setIsSearchActive(!isSearchActive)
    }

    const providerValue = {
        isMenuActive, toggleMenu,
        searchValue, setSearchValue,
        isAddBookmarkFormOpen, toggleAddBookmarkForm, setIsAddBookmarkFormOpen,
        isSearchActive, setIsSearchActive, toggleSearch,
        newBookmark, setNewBookmark,
        bookmarksSelection, setBookmarksSelection,
        shouldDeleteBookmark, setShouldDeleteBookmark,
        selectedBookmarkNumber, setSelectedBookmarkNumber,
        isEmptyCollection, setIsEmptyCollection,
        shouldMoveBookmark, setShouldMoveBookmark,
        moveBookmarksTo, setMoveBookmarksTo,
        toggleAddCollectionForm, isAddCollectionFormOpen, setIsAddCollectionFormOpen,
        newCollection, setNewCollection, isLoading, setIsLoading
    }

    return (
        <MainContext.Provider value={providerValue}>
            {children}
        </MainContext.Provider>
    )
}

export {MainContext, MainContextProvider}
