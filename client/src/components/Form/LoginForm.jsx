import classes from './Form.module.sass'
import {useState} from 'react'
import Button from '../UI/Button/Button'
import styled from "styled-components"
import FormInputBlock from './FormInputBlock/FormInputBlock'
import {useHistory} from "react-router-dom"
import Auth from '../DataAPI/Requests/Account'
import { Link } from "react-router-dom"


const LoginForm = () => {
    const [isLoginCorrect, setIsLoginCorrect] = useState(true)
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(true)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    let history = useHistory()

    const handleClick = () => {
        if (!password || !login) return
        Auth.login(login, password, data => {
            if (data.status === 'success') {
                history.push("/")
            } else {
                switch (data.message) {
                    case 'login incorrect':
                        setIsPasswordCorrect(true)
                        setIsLoginCorrect(false)
                        break
                    case 'password incorrect':
                        setIsLoginCorrect(true)
                        setIsPasswordCorrect(false)
                        break
                    default:
                        alert('Login or password incorrect')
                }
            }
        })
    }

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            handleClick()
        }
    }

    return (
        <div className={classes.Form}>
            <div className={classes.Form__Title}>Вход</div>
            <FormInputBlock
                label="Логин"
                error="Логин не найден"
                isError={!isLoginCorrect}
                onChange={event => setLogin(event.target.value)}
                onKeyDown={handleKeyDown}
            />
            <FormInputBlock
                label="Пароль"
                error="Неверный пароль"
                type='password'
                isError={!isPasswordCorrect}
                onChange={event => setPassword(event.target.value)}
                onKeyDown={handleKeyDown}
            />
            <div className={classes.Form__Buttons}>
                <Link to={'/register'} style={{ textDecoration: 'none' }}>
                    <RegisterButton>Нет аккаунта</RegisterButton>
                </Link>
                <Button
                    className={[
                        classes.LoginButton,
                        password && login ? '' : classes.LoginButton_disabled
                    ].join(' ')}
                    onClick={handleClick}
                >
                    Войти
                </Button>
            </div>
        </div>
    )
}

const RegisterButton = styled(Button)`
    height: 40px;
    border: 1px solid #1877f2;
    color: #1877f2;
    border-radius: 5px;
`

export default LoginForm