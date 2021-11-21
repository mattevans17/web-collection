import classes from './Form.module.sass'
import {useState, useContext, useCallback} from 'react'
import Button from '../UI/Button/Button'
import FormInputBlock from './FormInputBlock/FormInputBlock'
import {MainContext} from '../Main/MainContext'
import { v4 as uuidv4 } from 'uuid'

const AddCollectionForm = () => {
    const [collectionName, setCollectionName] = useState('')
    const context = useContext(MainContext)


    const handleKeyDown = event => {
        if (event.key === 'Enter' && collectionName !== '') {
            addCollectionRequest()
        }
    }

    const handleCollectionNameInputChange = useCallback(event => {
        setCollectionName(event.target.value)
    }, [])

    const addCollectionRequest = () => {
        if (collectionName !== '') {
            context.setNewCollection({
                key: uuidv4(),
                name: collectionName
            })
        }
    }


    return (
        <div className={[classes.Form, classes.AddBookmarkForm].join(' ')}>
            <div className={[classes.Form__Title, classes.AddBookmarkForm__Title].join(' ')}>Новая коллекция</div>
            <FormInputBlock
                label="Название"
                onChange={handleCollectionNameInputChange}
                onKeyDown={handleKeyDown}
            />
            <div className={[classes.Form__Buttons, classes.AddBookmarkForm__Buttons].join(' ')}>
                <Button 
                    className={classes.CancelButton} 
                    onClick={context.toggleAddCollectionForm}
                >Отмена</Button>
                <Button 
                    className={[classes.AddButton, collectionName === '' ? classes.AddButton_disabled : ''].join(' ')}
                    onClick={addCollectionRequest}
                >Добавить</Button>
            </div>
        </div>
    );
};

export default AddCollectionForm;