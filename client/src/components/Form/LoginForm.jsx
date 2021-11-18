import classes from './Form.module.sass';
import {useState} from 'react';
import Button from '../UI/Button/Button'
import NavButton from '../UI/NavButton/NavButton'
import styled from "styled-components";
import FormInputBlock from './FormInputBlock/FormInputBlock'
import { useHistory } from "react-router-dom";

const LoginForm = () => {
    const [state] = useState({
        isLoginError: false,
        isPasswordError: false
    })

    let history = useHistory();

    const handleClick = () => {
        if (!state.isLoginError && !state.isPasswordError) history.push("/");
    }

    return (
        <div className={classes.Form}>
            <div className={classes.Form__Title}>Вход</div>
            <FormInputBlock
                label="Логин"
                error="Логин не найден"
                isError={state.isLoginError}
            />
            <FormInputBlock
                label="Пароль"
                error="Неверный пароль"
                type='password'
                isError={state.isPasswordError}
            />
            <div className={classes.Form__Buttons}>
                <RegisterButton href="/register">Нет аккаунта</RegisterButton>
                <LoginButton onClick={() => handleClick()}>Войти</LoginButton>
            </div>
        </div>
    );
};

const RegisterButton = styled(NavButton)`
    height: 40px;
    border: 1px solid #1877f2;
    color: #1877f2;
    border-radius: 5px;
`

const LoginButton = styled(Button)`
    height: 40px;
    background-color: #42b72a;
    border-radius: 5px;
    color: white;
    font-size: 16px;
`

export default LoginForm