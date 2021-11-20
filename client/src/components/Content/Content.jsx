import {useContext} from 'react';
import ControlPanel from '../ControlPanel/ControlPanel';
import BookmarksList from '../BookmarksList/BookmarksList';
import classes from './Content.module.sass';
import ControlPanelMobile from '../ControlPanel/ControlPanelMobile';
import styled from 'styled-components';
import Button from '../UI/Button/Button';
import addIcon from '@assets/add.svg';
import AddBookmarkForm from '../Form/AddBookmarkForm';
import AddCollectionForm from '../Form/AddCollectionForm';
import {MainContext} from '../Main/MainContext';


const Content = () => {
    const context = useContext(MainContext)

    const handleAddBookmarkButtonClick = () => {
        context.toggleAddBookmarkForm()
        context.setBookmarksSelection(false)
    }

    return (
        <div className={classes.Content}>
            <ControlPanel />
            <ControlPanelMobile />
            {context.isAddBookmarkFormOpen &&
                <div className={classes.Panel}>
                    <AddBookmarkForm />
                </div>
            }
            {context.isAddCollectionFormOpen &&
                <div className={classes.Panel}>
                    <AddCollectionForm />
                </div>
            }
            <BookmarksList />
            <div className={classes.AddButtonWrapper}>
                <AddBookmarkButton onClick={handleAddBookmarkButtonClick}>
                    <img src={addIcon} className={classes.AddBookmarkButtonIcon} />
                </AddBookmarkButton>
            </div>
        </div>
    )
}

const AddBookmarkButton = styled(Button)`
    width: 55px;
    height: 55px;
    background: linear-gradient(258.33deg,#00A3FF 0%,#00F28D 100%);
    position: absolute;
    right: 30px;
    bottom: 30px;
    border-radius: 30px;
    box-shadow: 0 5px 10px 0 rgb(185 185 185);
    padding: 0;
`

export default Content