import styled from "styled-components";

const Button = ({children, ...props}) => {
    return (
        <StyledButton {...props}>
            {children}
        </StyledButton>
    );
};

const StyledButton = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 18px;
    padding-right: 18px;
    user-select: none;
`

export default Button