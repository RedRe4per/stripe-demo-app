import styled from "styled-components";

const Div = styled.div`
    padding: 40px;
`;
const P1 = styled.p`
    font-size: 24px;
    font-weight: bold;
`;

const P2 = styled.p`
    font-size: large;
`;

const ReturnDiv = styled.div`
    margin-top: 60px;
`;

const Button = styled.a`
    text-decoration: none;
    letter-spacing: 1px;
    padding: 10px 30px;
    cursor: pointer;
    background-color: #40B484;
    border-radius: 10px;
    color: white;
    font-weight: bold;
`;

const SuccessInfo = () => {

    return (
        <section>
            <Div>
                <P1>Payment successful! Thank you for your order.</P1>
                <P2>We are currently processing your order and will send you a confirmation email shortly.</P2>
            </Div>
            <ReturnDiv>
                <Button href="http://localhost:3000">Home Page</Button>
            </ReturnDiv>
        </section>
    )
}

export default SuccessInfo;