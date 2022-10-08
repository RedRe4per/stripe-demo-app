import styled from "styled-components";
import axios from '../../api/demoApi';
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Section = styled.section`
    text-align: center;
`;

const Div = styled.div`
    padding: 40px;
`;
const P1 = styled.p`
    font-size: 24px;
    font-weight: bold;
`;

const P4 = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: grey;
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

const Info = styled.div`
    margin: 0 auto;
    border: 3px solid lightgrey;
    border-radius: 15px;
    padding: 10px 20px;
    width: 650px;
    text-align:left;
`;

const P3 = styled.p`
    line-height: 0.35rem;
`;

const P3a = styled.p`
    padding-top: 15px;
    line-height: 0.35rem;
`;

const Span = styled.span`
    color: grey;
    font-weight: bold;
    margin-left: 5px;
`;

const Span1 = styled.span`
    color: grey;
    margin-left: 5px;
    font-size: 14px;
`;

const Span2 = styled.span`
    color: grey;
    font-weight: bold;
    margin-left: 20px;
`;

const SuccessInfo = () => {
    const [customerData, setCustomerData] = useState({
        name: "",
        email: "",
        phone: "",
        currency: "",
        amount_total: "",
        address: {
            country: "",
            state: "",
            city: "",
            line1: "",
            line2: "",
            postal_code: ""
        },
        orderSessionId: ""
    });
    
    /*
    useEffect(() => {
        axios({
            method: 'GET',
            url: `/order`,
        }).then(response => {
            const { customer_details } = response.data;
            setCustomerData({
                name: customer_details.name,
                email: customer_details.email,
                phone: customer_details.phone,
                currency: response.data.currency,
                amount_total: response.data.amount_total,
                address: customer_details.address,
                orderSessionId: response.data.id
            })
        }).catch(err => {
            toast.error("error", err)
        });
    }, [])
    */


    return (
        <Section>
            <Div>
                <P1>Payment successful! Thank you for your order.</P1>
                <P2>We are currently processing your order and will send you a confirmation email shortly.</P2>
            </Div>
            <ReturnDiv>
                <Button href="http://localhost:3000">Home Page</Button>
            </ReturnDiv>
        </Section>
    )
}

export default SuccessInfo;