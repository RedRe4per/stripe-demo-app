import styled from "styled-components";
import Header from "../../components/Header";
import axios from '../../api/demoApi';
import { useStripe } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';

const Section = styled.section`
    text-align: center;
`;

const DivOrderItem = styled.div`
    margin: 40px 50px;
    border: 3px solid lightgrey;
    border-radius: 15px;
    padding: 10px 20px;
    //width: 650px;
    text-align:left;
`;

const DivTop = styled.div`
    font-size: 18px;
    font-weight: bold;
    color: grey;
    padding: 10px;
`;

const DivContent = styled.div`
    display: flex;
`;

const DivBlock = styled.div`
    padding: 10px;
    margin-right: 20px;
`;

const Img = styled.img`
    width: 320px;
`;

const Div = styled.div`
    font-size: 14px;
    font-weight: bold;
    color: grey;
    padding: 10px;
`;

const FooterDiv = styled.div`
    margin-top: 50px;
    margin-bottom: 80px;
`;

const Button1 = styled.a`
    text-decoration: none;
    letter-spacing: 1px;
    padding: 10px 30px;
    cursor: pointer;
    background-color: #7088B1;
    border-radius: 10px;
    color: white;
    font-weight: bold;
    margin: 0px 30px;
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

const OrderFilling = () => {
    const orderItems = JSON.parse(localStorage.getItem("line_items"));
    const stripe = useStripe();


    const handleCheckout = async () => {
        const reg = /\d+\.\d+/g;
        const line_items = orderItems.map((cartItem) => {
            const priceStr = cartItem.quotation.match(reg);
            const price = parseFloat(priceStr[0]);
            return {
                quantity: 1,
                price_data: {
                    currency: "aud",
                    unit_amount: Math.round(price * 100),
                    product_data: {
                        name: cartItem.design.designName,
                        description: `Court type: ${cartItem.design.courtSize.name};  Size: ${cartItem.design.courtSize.length / 1000}m x ${cartItem.design.courtSize.width / 1000}m.`,
                        images: [cartItem.image],
                    }
                }
            }
        })

        const itemInstances = orderItems.map((orderItem)=>{
            return {
                quotation: orderItem.quotation,
                quotationDetails: orderItem.quotationDetails,
                image: orderItem.image,
                design: orderItem.design
            }
        }) 


        let orderId;
        await axios({
            method: 'POST',
            url: '/order',
            data: {
                user_id: "user123",
                items: itemInstances
            }
        }).then(response => {
            orderId = response.data._id;
        }).catch(err => {
            return toast.error(err);
        });


        if(!orderId) return toast.error('Fail to create order, please try again later.');
        const dataObj = { line_items: line_items, customer_email: "blhxp1@gmail.com", orderId: orderId };
        axios({
            method: 'POST',
            url: '/payment/create-checkout-session',
            data: dataObj
        }).then(response => {
            const { sessionId } = response.data;
            stripe.redirectToCheckout({
                sessionId
            })
        }).catch(err => {
            console.log(err)
        });
    }


    return (
        <Section>
            <Header></Header>
            <div>
                {
                    orderItems.map((orderItem) => {
                        return (
                            <DivOrderItem key={orderItem.id}>
                                <DivTop>Item: {orderItem.design.designName}</DivTop>
                                <DivContent>
                                    <DivBlock><Img src={orderItem.image} alt="no pic"></Img></DivBlock>
                                    <DivBlock>
                                        <Div>Court Type: {orderItem.design.courtSize.name}</Div>
                                        <Div>Size: {orderItem.design.courtSize.length / 1000}m x {orderItem.design.courtSize.width / 1000}m</Div>
                                        <Div>Quotation: {orderItem.quotation}</Div>
                                    </DivBlock>
                                </DivContent>
                            </DivOrderItem>
                        )
                    })
                }
            </div>
            <FooterDiv>
                <Button1 href="http://localhost:3000" target="_self">Go Back</Button1>
                <Button2 onClick={handleCheckout}>Proceed to Checkout</Button2>
            </FooterDiv>
        </Section>
    )
}

export default OrderFilling;