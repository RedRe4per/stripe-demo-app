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
    width: 350px;
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

const Span2 = styled.span`
    color: grey;
    font-weight: bold;
    margin-left: 20px;
`;

const SuccessInfo = () => {
    const url = useLocation().search;
    const checkoutSessionId = url.split('session_id=')[1];
    const [customerData, setCustomerData] = useState({
        name: "",
        email: "",
        phone: "",
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
    
    useEffect(() => {
        axios({
            method: 'GET',
            url: `/payment/${checkoutSessionId}`,
        }).then(response => {
            console.log('11111')
            const { customer_details } = response.data;
            setCustomerData({
                name: customer_details.name,
                email: customer_details.email,
                phone: customer_details.phone,
                address: customer_details.address,
                orderSessionId: response.data.id
            })
        }).catch(err => {
            toast.error("error", err)
        });
    }, [checkoutSessionId])


    return (
        <Section>
            <Div>
                <P1>Payment successful! Thank you for your order.</P1>
                <P2>We are currently processing your order and will send you a confirmation email shortly.</P2>
            </Div>
            <P4>Order details: </P4>
            <Info>
                <P3>Order_id: <Span>{'TBC, further database operation'}</Span></P3>
                <P3>Customer: <Span>{customerData.name}</Span></P3>
                <P3>Email: <Span>{customerData.email}</Span></P3>
                <P3>Phone: <Span>{customerData.phone}</Span></P3>
                <P3a>Address:</P3a>
                <P3><Span2>{customerData.address.country}, {customerData.address.state}, {customerData.address.city}</Span2></P3>
                <P3><Span2>{customerData.address.line1}, {customerData.address.line2}, {customerData.address.postal_code}</Span2></P3>
            </Info>
            <ReturnDiv>
                <Button href="http://localhost:3000">Home Page</Button>
            </ReturnDiv>
        </Section>
    )
}

export default SuccessInfo;