import classes from './Form.module.sass'
import {useState, useContext} from 'react'
import Button from '../UI/Button/Button'
import FormInputBlock from './FormInputBlock/FormInputBlock'
import $ from 'jquery'
import {MainContext} from '../Main/MainContext'
import {getDate, getTime} from '../Utils/DateTime'
import ftpIcon from '@assets/ftp.png'
import {getFullURL} from "../Utils/URL";
import {isURL} from 'validator'
import { v4 as uuidv4 } from 'uuid'

const AddBookmarkForm = () => {
    const [bookmarkTitle, setBookmarkTitle] = useState('')
    const [URL, setURL] = useState('')
    const context = useContext(MainContext)
    const [isValidURL, setIsValidURL] = useState(false)

    const fetchData = URL => {
        setURL(URL)
        $.ajax({
            url: `http://textance.herokuapp.com/title/${URL}`,
            complete: function(data) {
                setBookmarkTitle(URL !== '' && data.status === 200 ? data.responseText : '')
            }
        });
    }
    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            addBookmarkRequest()
        }
    }
    const handleURLInputChange = event => {
        if (isURL(event.target.value)) {
            setIsValidURL(true)
            setBookmarkTitle('')
            fetchData(event.target.value)
        } else {
            setIsValidURL(false)
        }
    }
    const handleTitleInputChange = event => {
        setBookmarkTitle(event.target.value)
    }
    const addBookmarkRequest = () => {
        if (bookmarkTitle !== '' && isValidURL) {
            const fullURL = getFullURL(URL)
            const faviconProviderURL = 'https://s2.googleusercontent.com/s2/favicons?domain='
            const iconURL = fullURL.startsWith('ftp://') ? ftpIcon : `${faviconProviderURL}${fullURL}`
            context.setNewBookmark({
                id: uuidv4(),
                title: bookmarkTitle, 
                url: fullURL,
                date: getDate(),
                time: getTime(),
                icon: iconURL
            })
        }
    }
    return (
        <div className={classes.Form + ' ' + classes.AddBookmarkForm}>
            <div className={classes.Form__Title + ' ' + classes.AddBookmarkForm__Title}>Новая закладка</div>
            <FormInputBlock
                label="URL"
                onChange={handleURLInputChange}
                onKeyDown={handleKeyDown}
            />
            {isValidURL &&
                <FormInputBlock
                    value={bookmarkTitle}
                    label="Название"
                    onChange={handleTitleInputChange}
                    onKeyDown={handleKeyDown}
                />
            }
            <div className={classes.Form__Buttons + ' ' + classes.AddBookmarkForm__Buttons}>
                <Button 
                    className={classes.CancelButton} 
                    onClick={context.toggleAddBookmarkForm}
                >Отмена</Button>
                <Button 
                    className={classes.AddButton + ' ' + ((bookmarkTitle === '' || !isValidURL) && classes.AddButton_disabled)}
                    onClick={addBookmarkRequest}
                >Добавить</Button>
            </div>
        </div>
    );
};

export default AddBookmarkForm;