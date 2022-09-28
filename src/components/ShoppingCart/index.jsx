import styled from 'styled-components';
import axios from '../../api/demoApi';
import { nanoid } from 'nanoid'
import { useState, useEffect } from 'react';

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
`;

const TableContent = styled.div``;

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
    flex: 1;
`;

const FooterDiv = styled.div`
    margin-top: 40px;
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

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        axios({
            method: 'GET',
            url: '/cartItem',
        }).then(response => {
            setCartItems(response.data);
        }).catch(err => {
            alert("error", err)
        });
    }, [])

    return (
        <section>
            <P>CART</P>
            <TableHeader>
                <Div>Image</Div>
                <Div>Product</Div>
                <Div>Quotation</Div>
                <Div>Quotation Details</Div>
            </TableHeader>
            <TableContent>
                {
                    cartItems.map((cartItem) => {
                        return(
                        <Item key={nanoid()}>
                            <Div>
                                <Img src={cartItem.image} alt="no pic"></Img>
                            </Div>
                            <Div>{cartItem.design.designName}</Div>
                            <Div>{cartItem.quotation}</Div>
                            <Div>{cartItem.quotation}</Div>
                        </Item>
                        )
                    })
                }
            </TableContent>
            <FooterDiv>
                <Button>Proceed to Checkout</Button>
            </FooterDiv>
        </section>
    )
}

export default ShoppingCart;