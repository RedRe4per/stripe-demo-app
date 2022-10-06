import styled from "styled-components";
import Header from "../../components/Header";
import axios from '../../api/demoApi';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Section = styled.section`
    text-align: center;
`;

const DivHeaderTitle = styled.div`
    text-align: left;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    color: #2C4E8A;
    margin-left: 35px;
    margin-top: 30px;
`;

const DivOrderItem = styled.div`
    margin: 8px 50px 60px 50px;
    border: 3px solid lightgrey;
    border-radius: 15px;
    padding: 10px 20px;
    //width: 650px;
    text-align:left;
`;

const DivTop = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: grey;
    padding: 10px;
    display: flex;
`;

const DivTopSub1 = styled.div`
    margin-left: 41px;
    margin-top: 30px;
    width: 300px;
    font-size: 15px;
    font-weight: bold;
    color: #2C4E8A;
`;

const DivTopSub2 = styled.div`
    margin-right: 60px;
    width: 130px;
`;

const DivTopSub3 = styled.div`
    margin-right: 60px;
    width: 300px;
`;

const DivContentTitle = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #2C4E8A;
    margin-left: 10px;
    margin-bottom: 5px;
`;

const DivContent = styled.div`
    border: 2px dotted #2C4E8A;
    border-radius: 5px;
    margin-left: 10px;
    margin-right: 10px;
`;

const DivItem = styled.div`
    display: flex;
    padding: 8px;
`;

const DivItemSub = styled.div`
    padding: 5px;
    margin-right: 40px;
    height: 45px;
    line-height:40px;
    font-size: 16px;
    font-weight: 500;
    color: #2C4E8A;
`;


const Img = styled.img`
    width: 80px;
`;


const FooterDiv = styled.div`
    margin-top: 50px;
    margin-bottom: 80px;
`;

const DivButton1 = styled.div`
    margin: 20px 30px 10px 30px;
    text-align: center;
`;

const Button1 = styled.a`
    text-decoration: none;
    letter-spacing: 0.6px;
    padding: 5px 15px;
    cursor: pointer;
    background-color: #40B484;
    border-radius: 10px;
    color: white;
    font-weight: 500;
    font-size: 14px;
    margin: 0px 30px;
`;

const DivBottom = styled.div`
    display: flex;
    justify-content: space-between;
`;

const DivBottomLeft = styled.div`
    border: 3px dashed lightgrey;
    border-radius: 5px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    padding: 5px 10px;
`;

const DivUserInfo0 = styled.div`
    font-size: 14px;
    color: #2C4E8A;
    font-weight: bold;
`;

const DivUserInfo = styled.div`
    font-size: 14px;
    color: #2C4E8A;
`;

const DivBottomRight = styled.div`
    font-size: 18px;
    font-weight: bold;
    color: grey;
    padding: 10px;
    display: flex;
    height: 40px;
    line-height: 80px;
    

`;

const Button2 = styled.a`
    text-decoration: none;
    letter-spacing: 1px;
    padding: 10px 30px;
    cursor: pointer;
    background-color: #40B484;
    border-radius: 10px;
    color: white;
    font-weight: bold;
    margin: 0px 30px;
`;

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios({
            method: 'GET',
            url: '/order',
        }).then(response => {
            console.log(response.data)
            setOrders(response.data);
        }).catch(err => {
            toast.error("error", err)
        });
    }, [])


    return (
        <Section>
            <Header></Header>
            <div>
                <DivHeaderTitle>My orders:</DivHeaderTitle>
                {
                    orders.map((order) => {
                        const createdDate = new Date(order.createdAt).toLocaleString();
                        const updatedDate = new Date(order.updatedAt).toLocaleString();

                        return (
                            <div>
                                <DivTopSub1>Order Id: {order.id}</DivTopSub1>
                                <DivOrderItem key={order.id}>
                                    <DivTop>
                                        <DivTopSub2 style={{ 'color': order.totalPrice ?  'green' : 'red' }}>Status: {order.totalPrice ? 'Paid' : 'unpaid'}</DivTopSub2>
                                        <DivTopSub3>Created at: {createdDate}</DivTopSub3>
                                        <DivTopSub3>Updated at: {updatedDate}</DivTopSub3>
                                    </DivTop>
                                    <DivContentTitle>Items: </DivContentTitle>
                                    <DivContent>
                                        {
                                            order.items.map((item) => {
                                                return (
                                                    <DivItem>
                                                        <DivItemSub><Img src={item.image} alt="no pic"></Img></DivItemSub>
                                                        <DivItemSub>{item.design.designName}</DivItemSub>
                                                        <DivItemSub>Quotation: {item.quotation}</DivItemSub>
                                                    </DivItem>
                                                )
                                            })
                                        }
                                    </DivContent>
                                    {
                                        order.isPaid === true ?
                                            <DivBottom>
                                                <DivBottomLeft>
                                                    <DivUserInfo0>Billing Address Info:</DivUserInfo0>
                                                    <DivUserInfo>{order.userInfo.shippingAddress.country}, {order.userInfo.shippingAddress.state}, {order.userInfo.shippingAddress.city}</DivUserInfo>
                                                    <DivUserInfo>{order.userInfo.shippingAddress.line1}, {order.userInfo.shippingAddress.line2}, {order.userInfo.shippingAddress.postal_code}</DivUserInfo>
                                                </DivBottomLeft>
                                                <DivBottomRight>Total Price: {order.currency === 'aud' ? 'A$' : order.currency} {order.totalPrice}</DivBottomRight>
                                            </DivBottom>
                                            : <DivButton1><Button1>Proceed to Checkout</Button1></DivButton1>
                                    }
                                </DivOrderItem>
                            </div>
                        )
                    })
                }
            </div>
            <FooterDiv>
                <Button2 href="http://localhost:3000" target="_self">Home Page</Button2>
            </FooterDiv>
        </Section>
    )
}

export default OrderList;