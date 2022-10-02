import styled from "styled-components";
import Header from "../../components/Header";
import CancelInfo from "../../components/Payment/cancel";

const PaymentCancel = () => {
    const Section = styled.section`
        text-align: center;
    `;


    return (
        <Section>
            <Header></Header>
            <CancelInfo></CancelInfo>
        </Section>
    )
}

export default PaymentCancel;