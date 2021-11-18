import styled from 'styled-components';

const Input = ({inputRef, ...props}) => {
    return (
        <StyledInput {...props} size='10' spellCheck='false' ref={inputRef} />
    );
};

const StyledInput = styled.input`
    padding: 10px;
    height: 40px;
`

export default Input;