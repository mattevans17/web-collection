import {useState} from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import Input from '../Input/Input';
import HidePwdIcon from './hide_password.svg';
import ShowPwdIcon from './show_password.svg';

const PasswordInput = (props) => {
    const [isHiddenPassword, setIsHiddenPassword] = useState(true)
    return (
        <StyledPasswordInput>
            <StyledInput 
                onChange={props.onChange}
                onKeyDown={props.onKeyDown}
                type={isHiddenPassword ? 'password' : 'text'}
            />
            <ShowPasswordButton onClick={() => setIsHiddenPassword(!isHiddenPassword)}>
                <ShowPasswordIcon 
                    src={isHiddenPassword ? 
                        HidePwdIcon : 
                        ShowPwdIcon
                    }
                />
            </ShowPasswordButton>
        </StyledPasswordInput>
    );
};

const StyledPasswordInput = styled.div`
    display: flex;
    border: 1px solid #aaaaaa;
    overflow: hidden;
    border-radius: 5px;
`

const StyledInput = styled(Input)`
    border: none;
    flex-grow: 1;
    font-size: 21px;
`

const ShowPasswordButton = styled(Button)`
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
`

const ShowPasswordIcon = styled.img`
    width: 26px;
    filter: invert(35%);
    pointer-events: none;
`

export default PasswordInput;