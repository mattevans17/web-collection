import styled from "styled-components";

const NavButton = ({children, ...props}) => {
    return (
        <StyledNavButton {...props}>
            {children}
        </StyledNavButton>
    );
};

const StyledNavButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 15px;
    padding-right: 15px;
    text-decoration: none;
    user-select: none;
`

export default NavButton;