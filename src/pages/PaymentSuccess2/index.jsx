import styled from "styled-components";
import Header from "../../components/Header";
import SuccessInfo from "../../components/Payment/success2";

const PaymentSuccess = () => {
    const Section = styled.section`
        text-align: center;
    `;

    return (
        <Section>
            <Header></Header>
            <SuccessInfo></SuccessInfo>
        </Section>
    )
}

export default PaymentSuccess;