import styled from 'styled-components';

const Div = styled.div`
    background-color: #2C4E8A;
    color: white;
    height: 70px;
    line-height: 70px;
    font-weight: bold;
    letter-spacing: 0.2ch;
`;

const Header = () => {
    return(
        <Div>Court Canva Header</Div>
    )
}

export default Header;