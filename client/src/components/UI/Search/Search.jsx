import {useState, useEffect, useContext, createRef} from 'react';
import styled from 'styled-components';
import Input from '../Input/Input'
import Button from '../Button/Button'
import cancelIcon from '@assets/cancel.svg'
import searchIcon from '@assets/search.svg'
import {MainContext} from '../../Main/MainContext'

const Search = ({setSearchValue, initialValue}) => {
    const context = useContext(MainContext)
    const inputRef = createRef()

    const [value, setValue] = useState(initialValue);
    const closeButtonClickHandler = () => {
        setValue('')
        setSearchValue('')
    }
    const inputChangeHandler = (event) => {
        setValue(event.target.value)
        setSearchValue(event.target.value)
    }
    useEffect(() => {
        context.searchValue === '' && setValue('')
    }, [context.searchValue])

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            inputRef.current.blur()
        }
    }

    return (
        <StyledSearch>
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
            <StyledInput 
                autoFocus
                onChange={inputChangeHandler} 
                placeholder='Поиск: имя или URL' 
                value={value}
                inputRef={inputRef}
                onKeyPress={event => handleKeyPress(event)}
            />
            {value !== '' &&
                <CloseButton onClick={closeButtonClickHandler}>
                    <CloseIcon />
                </CloseButton>
            }
        </StyledSearch>
    )
}

const SearchIconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 100%;
`

const SearchIcon = styled.div`
    width: 14px;
    height: 14px;
    background-image: url(${searchIcon});
    opacity: 0.6;
`

const CloseButton = styled(Button)`
    width: 30px;
    height: 100%;
    padding: 0px;
`

const CloseIcon = styled.div`
    width: 12px;
    height: 12px;
    opacity: 0.6;
    background-image: url(${cancelIcon});
`

const StyledSearch = styled.div`
    width: 290px;
    height: 30px;
    display: flex;
    border: 1px solid #DCDCDC;
    border-radius: 15px;
    padding: 0px 2px 0px 2px;
    background-color: #f2f3f7;
`

const StyledInput = styled(Input)`
    flex-grow: 1;
    height: 100%;
    border: none;
    font-size: 14px;
    padding: 0px;
    background: none;
    color: #555555;
`

export default Search