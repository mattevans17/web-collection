import classes from './FormInputBlock.module.sass'
import PasswordInput from '../../UI/PasswordInput/PasswordInput'
import Input from '../../UI/Input/Input'
import styled from 'styled-components'

const FormInputBlock = props => {
    return (
        <div className={classes.InputBlock}>
            <div className={classes.Info}>
                <div className={classes.Label}>{props.label}</div>
                {props.isError && <div className={classes.Error}>{props.error}</div>}
            </div>
            {props.type === 'password' ? 
                <PasswordInput 
                    onChange={props.onChange}
                    onKeyDown={props.onKeyDown}
                /> : 
                <StyledInput 
                    onChange={props.onChange} 
                    onKeyDown={props.onKeyDown}
                    value={props.value}
                />
            }
        </div>
    )
}

const StyledInput = styled(Input)`
    width: 100%;
    font-size: 21px;
    border-radius: 5px;
    border: 1px solid #aaaaaa;
`

export default FormInputBlock
