import classes from './ControlPanel.module.sass';
import {useContext} from 'react';
import Search from '../UI/Search/Search';
import styled from 'styled-components';
import Button from '../UI/Button/Button';
import {MainContext} from '../Main/MainContext';

const ControlPanel = () => {
    const context = useContext(MainContext)
    const buttonSelectHandler = () => {
        context.setBookmarksSelection(!context.bookmarksSelection)
    }
    const buttonRemoveHandler = () => {
        if (context.bookmarksSelection) {
            context.setShouldDeleteBookmark(true)
        }
    }

    const addBookmarkButtonHandler = () => {
        context.toggleAddBookmarkForm()
        context.setBookmarksSelection(false)
    }

    return (
        <div className={classes.ControlPanel}>
            <AddButton onClick={addBookmarkButtonHandler}>Добавить</AddButton>
            <Search setSearchValue={value => context.setSearchValue(value)}/>
            <div className={classes.Buttons}>
                {(context.bookmarksSelection && context.selectedBookmarkNumber !== 0) &&
                    <RemoveButton onClick={buttonRemoveHandler}>Удалить</RemoveButton>
                }
                {!context.isEmptyCollection &&
                    <SelectButton onClick={buttonSelectHandler}>{context.bookmarksSelection ? 'Отмена' : 'Выбрать'}</SelectButton>
                }
            </div>
        </div>
    );
};

const selectButtonColor = '#00AFEF';
const removeButtonColor = 'red';
const buttonTransition = '150ms';
const buttonMargin = '10px';

const SelectButton = styled(Button)`
    height: 30px;
    background: none;
    color: ${selectButtonColor};
    border: 1px solid ${selectButtonColor};
    border-radius: 10px;
    margin-left: ${buttonMargin};
    transition: background-color ${buttonTransition}, color ${buttonTransition};
    
    :hover {
        background-color: ${selectButtonColor};
        color: white;
        transition: background-color ${buttonTransition}, color ${buttonTransition};
    }
`

const RemoveButton = styled(Button)`
    height: 30px;
    background: none;
    color: ${removeButtonColor};
    border: 1px solid ${removeButtonColor};;
    border-radius: 10px;
    margin-left: ${buttonMargin};
    transition: background-color ${buttonTransition}, color ${buttonTransition};
    
    :hover {
        background-color: ${removeButtonColor};
        color: white;
        transition: background-color ${buttonTransition}, color ${buttonTransition};
    }
`

const AddButton = styled(Button)`
    width: 120px;
    margin-right: ${buttonMargin};
    height: 30px;
    color: white;
    border-radius: 20px;
    box-shadow: 0px 3px 4px 0px #0000002E;
    background: linear-gradient(258.33deg, #00A3FF 0%, #00F28D 100%);
    transition: box-shadow ${buttonTransition} ease-in-out;

    :hover {
        box-shadow: 0px 5px 5px 0px #0000002E;
        transition: box-shadow ${buttonTransition} ease-in-out;
    }

    :active {
        box-shadow: 0px 1px 3px 0px #0000002E;
        transition: box-shadow ${buttonTransition} ease-in-out;
    }
`

export default ControlPanel;