import styled from 'styled-components';
import axios from '../../api/demoApi';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import localStorage from 'localStorage';

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


const ShoppingCart = () => {
    const [cartItemsRebuilt, setCartItemsRebuilt] = useState([]);

    useEffect(() => {
        axios({
            method: 'GET',
            url: '/cartItem',
        }).then(response => {
            const newArr = response.data.map((cartItem) => {
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
            if (cartItem._id === id) cartItem.checked = !cartItem.checked;
            return cartItem;
        })
        setCartItemsRebuilt(newCartItems)
    };

    const CreateOrderHandler = async () => {
        const line_items = cartItemsRebuilt.filter((cartItem) => {
            return cartItem.checked === true;
        })
        if(line_items.length === 0) return toast.error('To checkout, you have to select at least one item.');

        localStorage.setItem("line_items", JSON.stringify(line_items));
        window.location.href = "http://localhost:3000/orderfilling";
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
                                <DivQuotationDetails>{`Court type: ${cartItem.design.courtSize.name};  Size: ${cartItem.design.courtSize.length / 1000}m x ${cartItem.design.courtSize.width / 1000}m.`}</DivQuotationDetails>
                            </Item>
                        )
                    })
                }
            </TableContent>
            <FooterDiv>
                <Button onClick={CreateOrderHandler}>Create Order</Button>
            </FooterDiv>
        </section>
    )
}

export default ShoppingCart;