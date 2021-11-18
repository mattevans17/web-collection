import classes from './Form.module.sass'
import {useState} from 'react'
import Button from '../UI/Button/Button'
import NavButton from '../UI/NavButton/NavButton'
import styled from "styled-components"
import FormInputBlock from './FormInputBlock/FormInputBlock'
import { useHistory } from "react-router-dom"

const RegisterForm = () => {
    const [state, setState] = useState({
        isValidLogin: true,
        isValidPwd: true,
        isPwdsMatch: true,
        password: '',
        matchPassword: ''
    })

    let history = useHistory();

    const checkValidPwd = () => {
        return state.password.length < 8 ? false : true
    }

    const checkMatchPwd = () => {
        return state.password === state.matchPassword ? true : false
    }

    const handleClick = () => {
        setState({...state, 
            isValidPwd: (checkValidPwd() ? true : false),
            isPwdsMatch: (checkMatchPwd() ? true : false)
        })
        if (checkValidPwd() && checkMatchPwd()) history.push("/")
    }

    return (
        <div className={classes.Form}>
            <div className={classes.Form__Title}>Регистрация</div>
            <FormInputBlock
                label="Логин"
                error="Логин не найден"
                isError={!state.isValidLogin}
            />
            <FormInputBlock
                type='password'
                label="Пароль"
                error="< 8 символов"
                isError={!state.isValidPwd}
                onChange={event => {
                    setState({...state,
                        password: event.target.value,
                    })
                }}
            />
            <FormInputBlock
                type='password'
                label="Повторите пароль"
                error="Пароли не совпадают"
                isError={!state.isPwdsMatch}
                onChange={event =>
                    setState({...state,
                        matchPassword: event.target.value,
                    })
                }
            />
            <div className={classes.Form__Buttons}>
                <ToLoginButton href="/login">Есть аккаунт?</ToLoginButton>
                <RegisterButton onClick={() => handleClick()}>Создать аккаунт</RegisterButton>
            </div>
        </div>
    );
};

const ToLoginButton = styled(NavButton)`
    height: 40px;
    border-radius: 5px;
    border: 1px solid #1877f2;
    color: #1877f2;
`

const RegisterButton = styled(Button)`
    height: 40px;
    background-color: #1877f2;
    color: white;
    border-radius: 5px;
    font-size: 16px;
`

export default RegisterForm