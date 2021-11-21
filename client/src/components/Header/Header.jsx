import classes from './Header.module.sass'
import Logo from '../Logo/Logo'
import CurrentCollection from '../CurrentCollection/CurrentCollection'
import Button from "../UI/Button/Button"
import accountIcon from "@assets/user.svg"
import styled from "styled-components"
import {Context} from '../Home/Context'
import {useContext, useEffect} from "react"
import Account from "../DataAPI/Requests/Account"
import {useHistory} from "react-router-dom"
import Auth from "../DataAPI/Requests/Account"
import CollectionsStorage from '../DataAPI/CollectionsStorage'


const Header = () => {
    const context = useContext(Context)
    let history = useHistory()

    useEffect(() => {
        Account.getLogin(login => context.setLogin(login))
    }, [])

    const handleAccountButtonClick = () => {
        context.setIsAccountOptionsOpen(!context.isAccountOptionsOpen)
    }

    const handleLogoutButtonClick = () => {
        Auth.signOut(() => {
            CollectionsStorage.clearAll()
            history.push("/login")
        })
    }

    return (
        <div className={classes.header}>
            <div className={classes.left}>
                <Logo/>
            </div>
            <div className={classes.right}>
                <CurrentCollection />
                <AccountButton onClick={handleAccountButtonClick}>
                    <AccountIcon src={accountIcon} />
                </AccountButton>
                {context.isAccountOptionsOpen &&
                    <AccountOptions>
                        <LoginTitle title={context.login}>{context.login}</LoginTitle>
                        <SignOutButton onClick={handleLogoutButtonClick}>Выйти</SignOutButton>
                    </AccountOptions>
                }
            </div>
        </div>
    )
}

const AccountIcon = styled.img`
    width: 21px;
    height: 21px;
    filter: invert(0.4);
`

const AccountButton = styled(Button)`
    width: 30px;
    height: 30px;
    border: 1px solid #DCDCDC;
    padding: 0;
    border-radius: 20px;
`

const AccountOptions = styled.div`
    position: absolute;
    width: 130px;
    background-color: white;
    right: 0;
    top: 50px;
    z-index: 3;
    border: 1px solid #DCDCDC;
    border-top: none;
    border-right: none;
    border-radius: 0 0 0 10px;
`

const SignOutButton = styled(Button)`
    width: 100%;
    height: 30px;
    padding: 5px;
`

const LoginTitle = styled.div`
    width: 100%;
    height: 30px;
    padding: 5px;
    border-bottom: 1px solid #DCDCDC;
    text-overflow: ellipsis;
    overflow: hidden;
`

export default Header
