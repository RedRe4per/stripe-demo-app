import styled from 'styled-components';
import axios from '../../api/demoApi';
import { useState, useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const P = styled.p`
    font-weight: bold;
    letter-spacing: 0.2ch;
`;

const TableHeader = styled.div`
    display: flex;
    justify-content: space-around;
    background-color: lightgray;
    font-weight: bold;
    font-size: large;
    padding: 0px 20px 0px 40px;
`;

const TableContent = styled.div`
    padding: 0px 20px 0px 40px;
`;

const Item = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    height: 60px;
    line-height: 60px;
`;

const Img = styled.img`
    width: 120px;
`;

const Div = styled.div`
    flex: 4;
`;

const DivCheckbox = styled.div`
    flex: 1;
`;

const DivQuotationDetails = styled.div`
    flex: 8;
`;

const FooterDiv = styled.div`
    margin-top: 50px;
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

const ButtonMore = styled.a`
    text-decoration: none;
    letter-spacing: 0.5px;
    padding: 3px 10px;
    cursor: pointer;
    background-color: #40B484;
    border-radius: 8px;
    color: white;
    font-weight: bold;
`;

const ShoppingCart = () => {
    const [cartItemsRebuilt, setCartItemsRebuilt] = useState([]);
    const stripe = useStripe();

    useEffect(() => {
        axios({
            method: 'GET',
            url: '/cartItem',
        }).then(response => {
            const newArr = response.data.map((cartItem) => {
                let quotationDetailsStr = "";
                cartItem.quotationDetails.forEach((element) => {
                    quotationDetailsStr += ` Color: ${element.color}, Quantity: ${element.quantity};`;
                })
                cartItem.quotationDetails = quotationDetailsStr;
                cartItem.checked = false;
                return cartItem;
            })
            setCartItemsRebuilt(newArr);

        }).catch(err => {
            toast.error("error", err)
        });
    }, [])

    const checkboxHandler = (id) => {
        const newCartItems = cartItemsRebuilt.map((cartItem) => {
            //cartItem.checked = false;
            if (cartItem._id === id) cartItem.checked = !cartItem.checked;
            return cartItem;
        })
        setCartItemsRebuilt(newCartItems)
    };

    const CheckoutHandler = async () => {
        const reg = /\d+\.\d+/g;

        const line_items = cartItemsRebuilt.filter((cartItem) => {
            return cartItem.checked === true;
        }).map((cartItem) => {
            const priceStr = cartItem.quotation.match(reg);
            const price = parseFloat(priceStr[0]);
            return {
                quantity: 1,
                price_data: {
                    currency: "aud",
                    unit_amount: Math.round(price * 100),
                    product_data: {
                        name: cartItem.design.designName,
                        description: cartItem.quotationDetails,
                        images: [cartItem.image],
                    }
                }
            }
        })
        if(line_items.length === 0){
            return toast.error('To checkout, you have to select at least one item.')
        }
        const dataObj = { line_items: line_items, customer_email: "blhxp1@gmail.com" }

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
        <section>
            <P>CART</P>
            <TableHeader>
                <DivCheckbox>Select</DivCheckbox>
                <Div>Image</Div>
                <Div>Product</Div>
                <Div>Quotation</Div>
                <DivQuotationDetails>Quotation Details</DivQuotationDetails>
                <Div></Div>
            </TableHeader>
            <TableContent>
                {
                    cartItemsRebuilt.map((cartItem) => {
                        return (
                            <Item key={cartItem._id}>
                                <DivCheckbox>
                                    <input type="checkbox" checked={cartItem.checked} onChange={() => checkboxHandler(cartItem._id)}></input>
                                </DivCheckbox>
                                <Div>
                                    <Img src={cartItem.image} alt="no pic"></Img>
                                </Div>
                                <Div>{cartItem.design.designName}</Div>
                                <Div>{cartItem.quotation}</Div>
                                <DivQuotationDetails>{cartItem.quotationDetails}</DivQuotationDetails>
                                <Div>
                                    <ButtonMore>More</ButtonMore>
                                </Div>
                            </Item>
                        )
                    })
                }
            </TableContent>
            <FooterDiv>
                <Button onClick={CheckoutHandler}>Proceed to Checkout</Button>
            </FooterDiv>
            <ToastContainer
                style={{ fontSize: "16px" }}
                theme="dark"
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </section>
    )
}

export default ShoppingCart;