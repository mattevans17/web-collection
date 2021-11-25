import {useContext, Fragment} from "react"
import MenuElem from './MenuElem/MenuElem'
import Button from "../UI/Button/Button"
import CollectionsStorage from '../DataAPI/CollectionsStorage'
import {Context} from '../Home/Context'
import {MainContext} from '../Main/MainContext'
import closedFolderIcon from '@assets/folder.svg'
import openedFolderIcon from '@assets/opened_folder.svg'
import unsortedBookmarksIcon from '@assets/harddrive.png'
import allBookmarksIcon from '@assets/cloud.png'
import addCollectionIcon from '@assets/plus.svg'
import styled from "styled-components"
import classes from './Menu.module.sass'


const Menu = () => {
    const mainContext = useContext(MainContext)
    const context = useContext(Context)

    const handleClick = (type, data=null) => {
        switch (type) {
            case 'all': {
                if (!mainContext.bookmarksSelection) {
                    context.currentCollectionKey !== 'all' && context.setCurrentCollectionKey('all')
                    mainContext.isMenuActive && mainContext.toggleMenu()
                }
                break
            }
            case 'unsorted': {
                if (mainContext.bookmarksSelection) {
                    if (context.currentCollectionKey !== 'all' && mainContext.selectedBookmarkNumber) {
                        mainContext.setShouldMoveBookmark(true)
                        mainContext.setMoveBookmarksTo('unsorted')
                    }
                } else {
                    context.currentCollectionKey !== 'unsorted' && context.setCurrentCollectionKey('unsorted')
                }
                mainContext.isMenuActive && mainContext.toggleMenu()
                break
            }
            default: {
                if (mainContext.bookmarksSelection) {
                    if (context.currentCollectionKey !== 'all' && mainContext.selectedBookmarkNumber) {
                        mainContext.setShouldMoveBookmark(true)
                        mainContext.setMoveBookmarksTo(data.key)
                    }
                } else {
                    data.key !== context.currentCollectionKey && context.setCurrentCollectionKey(data.key)
                }
                mainContext.isMenuActive && mainContext.toggleMenu()
            }
        }
    }

    const handleEditClick = idx => {
        alert(`Collection ${idx}: edit`)
    }

    return (
        <Fragment>
            <div className={[classes.menu, mainContext.isMenuActive ? classes.menu_active : ''].join(' ')}>
                <MenuElem
                    icon={allBookmarksIcon}
                    collectionName={CollectionsStorage.getCollectionNameByKey('all')}
                    isUnchangeable={true}
                    onClick={() => handleClick('all')}
                    isActive={context.currentCollectionKey === 'all'}
                />
                <MenuElem
                    icon={unsortedBookmarksIcon}
                    collectionName={CollectionsStorage.getCollectionNameByKey('unsorted')}
                    isUnchangeable={true}
                    onClick={() => handleClick('unsorted')}
                    isActive={context.currentCollectionKey === 'unsorted'}
                />
                <div className={classes.collectionListTitle}>
                    <h1>Коллекции</h1>
                    <AddCollectionButton onClick={mainContext.toggleAddCollectionForm}>
                        <img src={addCollectionIcon} className={classes.addCollectionIcon} />
                    </AddCollectionButton>
                </div>
                {CollectionsStorage.getCollectionsList().map(collection => (
                    <MenuElem
                        icon={collection.key === context.currentCollectionKey ? openedFolderIcon : closedFolderIcon}
                        collectionName={collection.name}
                        onClick={() => handleClick('', {key: collection.key})}
                        isActive={collection.key === context.currentCollectionKey}
                        onEdit={() => handleEditClick(collection.key)}
                    />
                ))}
            </div>
            {mainContext.isMenuActive &&
                <div className={classes.BackgroundFilling} onClick={() => mainContext.toggleMenu()} />
            }
        </Fragment>
    );
};

const AddCollectionButton = styled(Button)`
    padding: 0;
    width: 28px;
    height: 28px;
`

export default Menu;