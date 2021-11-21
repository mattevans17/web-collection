import classes from './Form.module.sass'
import {useState} from 'react'
import Button from '../UI/Button/Button'
import styled from "styled-components"
import FormInputBlock from './FormInputBlock/FormInputBlock'
import { useHistory } from "react-router-dom"
import Auth from "../DataAPI/Requests/Account"
import { Link } from "react-router-dom"


const RegisterForm = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [matchPassword, setMatchPassword] = useState('')
    const [isLoginAvailable, setIsLoginAvailable] = useState(true)
    const [isValidPassword, setIsValidPassword] = useState(true)
    const [isPasswordsMatch, setIsPasswordsMatch] = useState(true)

    let history = useHistory();

    const checkValidPwd = () => {
        return password.length >= 8
    }

    const checkMatchPwd = () => {
        return password === matchPassword
    }

    const handleClick = () => {
        if (!password || !login || !matchPassword) return

        let isValidPassword = checkValidPwd()
        let isPasswordsMatch = checkMatchPwd()

        setIsValidPassword(isValidPassword)
        setIsPasswordsMatch(isPasswordsMatch)

        if (isValidPassword && isPasswordsMatch) {
            Auth.register(login, password, data => {
                if (data.status === 'success') {
                    history.push("/")
                } else if (data.message === 'login unavailable') {
                    setIsLoginAvailable(false)
                }
            })
        }
    }

    const handleKeyDown = event => {
        event.key === 'Enter' && handleClick()
    }

    return (
        <div className={classes.Form}>
            <div className={classes.Form__Title}>Регистрация</div>
            <FormInputBlock
                label="Логин"
                error="Логин занят"
                isError={!isLoginAvailable}
                onChange={event => setLogin(event.target.value)}
                onKeyDown={handleKeyDown}
            />
            <FormInputBlock
                type='password'
                label="Пароль"
                error="< 8 символов"
                isError={!isValidPassword}
                onChange={event => setPassword(event.target.value)}
                onKeyDown={handleKeyDown}
            />
            <FormInputBlock
                type='password'
                label="Повторите пароль"
                error="Пароли не совпадают"
                isError={!isPasswordsMatch}
                onChange={event => setMatchPassword(event.target.value)}
                onKeyDown={handleKeyDown}
            />
            <div className={classes.Form__Buttons}>
                <Link to={'/login'} style={{ textDecoration: 'none' }}>
                    <ToLoginButton>Есть аккаунт?</ToLoginButton>
                </Link>
                <Button
                    className={[
                        classes.RegisterButton,
                        password && login && matchPassword ? '' : classes.RegisterButton_disabled
                    ].join(' ')}
                    onClick={handleClick}
                >Создать аккаунт
                </Button>
            </div>
        </div>
    );
};


const ToLoginButton = styled(Button)`
    height: 40px;
    border-radius: 5px;
    border: 1px solid #1877f2;
    color: #1877f2;
`


export default RegisterForm