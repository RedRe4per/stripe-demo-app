import styled from 'styled-components';

const Div = styled.div`
    background-color: #2C4E8A;
    display: flex;
    justify-content: space-around;
`;

const Title = styled.div`
    margin-left: 200px;
    color: white;
    height: 70px;
    line-height: 70px;
    font-weight: bold;
    letter-spacing: 0.2ch;
    flex: 4;
`;
const Button = styled.a`
    margin: 20px;
    text-decoration: none;
    letter-spacing: 0.6px;
    padding: 5px 15px;
    cursor: pointer;
    background-color: white;
    border-radius: 20px;
    color: #2C4E8A;
    font-weight: 500;
    font-size: 14px;
    white-space: nowrap;
    font-weight: bold;
    flex: 1;
    max-width: 90px;
`;

const Header = () => {
    return (
        <Div>
            <Title>Court Canva Header</Title>
            <Button href="http://localhost:3000/order" target="_self">My Order</Button>
        </Div>
    )
}

export default Header;