import {useContext} from 'react'
import Button from './Button'
import styled from 'styled-components'
import classes from './MenuButton.module.sass'
import {MainContext} from "../../Main/MainContext"

const MenuButton = ({onClick}) => {
    const context = useContext(MainContext)

    const buttonClickHandler = () => {
        context.toggleMenu()
        onClick()
    }

    return (
        <StyledButton onClick={buttonClickHandler}>
            <div className={classes.menu__lines + ' ' + (context.isMenuActive && classes.menu__lines_active)}>
                <div className={classes.menu__line} />
                <div className={classes.menu__line} />
                <div className={classes.menu__line} />
            </div>
        </StyledButton>
    );
};

const StyledButton = styled(Button)`
    height: 35px;
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
`

export default MenuButton;