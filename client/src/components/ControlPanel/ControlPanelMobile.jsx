import {useContext} from 'react'
import classes from './ControlPanel.module.sass'
import styled from 'styled-components'
import Search from '../UI/Search/Search'
import Button from '../UI/Button/Button'
import MenuButton from '../UI/Button/MenuButton'
import backIcon from '@assets/back.png'
import trashIcon from '@assets/trash.svg'
import searchIcon from '@assets/search.svg'
import CurrentCollection from '../CurrentCollection/CurrentCollection'
import {MainContext} from "../Main/MainContext";

const ControlPanelMobile = () => {
    const context = useContext(MainContext)

    const toggleSearch = () => {
        context.toggleSearch()
        context.isSearchActive && context.setSearchValue('')
    }
    const handleSearchButtonClick = () => {
        context.bookmarksSelection ? context.setBookmarksSelection(false) : toggleSearch()
        context.setIsAddBookmarkFormOpen(false)
        context.isMenuActive && context.toggleMenu()
    }
    const handleDeleteButtonClick = () => {
        context.setShouldDeleteBookmark(true)
    }
    const handleMenuButtonClick = () => {
        context.toggleMenu()
        !context.bookmarksSelection && context.isSearchActive && context.toggleSearch()
        context.isAddBookmarkFormOpen && context.toggleAddBookmarkForm()
    }

    return (
        <div className={classes.ControlPanelMobile}>
            <div className={classes.MarginRight}>
                <MenuButton onClick={handleMenuButtonClick} />
            </div>
            {context.isSearchActive && !context.bookmarksSelection ? 
                <div className={classes.StyledSearch}>
                    <Search setSearchValue={value => context.setSearchValue(value)}
                            initialValue={context.searchValue}
                    />
                </div>
                : 
                context.bookmarksSelection ? 
                    <div className={classes.SelectedBookmarksControlPanel}>
                        <p className={classes.SelectedBookmarksNumber}>Выбрано: {context.selectedBookmarkNumber}</p>
                        <div className={classes.Buttons_mobile}>
                            {context.selectedBookmarkNumber !== 0 &&
                                <ActionButton onClick={handleDeleteButtonClick} >
                                    <img className={classes.DeleteButtonIcon} src={trashIcon} />
                                </ActionButton>
                            }
                        </div>
                    </div>
                    :
                    <div className={classes.CurrentCollectionWrapper}>
                        <CurrentCollection />
                    </div>
            }
            <SearchButton onClick={handleSearchButtonClick}>
                <img className={classes.SearchButtonIcon}
                     src={context.isSearchActive || context.bookmarksSelection ? backIcon : searchIcon}
                />
            </SearchButton>
        </div>
    );
};

const SearchButton = styled(Button)`
    width: 35px;
    height: 35px;
    padding: 0px;
    border: 1px solid #c2c2c2;
    border-radius: 20px;
    margin-left: auto;
    background-color: white;
`

const ActionButton = styled(Button)`
    padding: 0px;
    height: 35px;
    width: 35px;
    margin-left: 7px;
`

export default ControlPanelMobile;