import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { FaShoppingCart, FaTrash, FaPlus, FaMinus, FaBox, 
         FaTruck, FaMoneyBillWave, FaArrowRight, FaShoppingBag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const float = keyframes`
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
    100% { transform: translateY(0px) rotate(0deg); }
`;

const pulse = keyframes`
    0% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.05); opacity: 0.8; }
    100% { transform: scale(1); opacity: 0.5; }
`;

const FloatingIcon = styled.div`
    position: absolute;
    font-size: ${props => props.size || '2rem'};
    color: ${props => props.theme.primary}40;
    animation: ${float} ${props => props.duration || '3s'} ease-in-out infinite;
    animation-delay: ${props => props.delay || '0s'};
    left: ${props => props.left || '0'};
    top: ${props => props.top || '0'};
    z-index: 0;
`;

const PulsingCircle = styled.div`
    position: absolute;
    width: ${props => props.size || '100px'};
    height: ${props => props.size || '100px'};
    border-radius: 50%;
    background: ${props => props.theme.primary}20;
    left: ${props => props.left || '0'};
    top: ${props => props.top || '0'};
    animation: ${pulse} ${props => props.duration || '3s'} ease-in-out infinite;
    animation-delay: ${props => props.delay || '0s'};
    z-index: 0;
`;

const Container = styled.div`
    min-height: 100vh;
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
    position: relative;
    overflow: hidden;
    padding: 2rem;
    transition: all 0.3s ease;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const CartContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
`;

const CartHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    h1 {
        font-size: 2rem;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 1rem;

        svg {
            color: ${props => props.theme.primary};
        }
    }
`;

const CartCard = styled.div`
    background: ${props => props.theme.cardBg};
    border-radius: 15px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    }
`;

const CartItem = styled.div`
    display: grid;
    grid-template-columns: 100px 1fr auto;
    gap: 1rem;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid ${props => props.theme.text}20;

    &:last-child {
        border-bottom: none;
    }

    @media (max-width: 768px) {
        grid-template-columns: 80px 1fr;
        gap: 0.5rem;
    }
`;

const ItemImage = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    overflow: hidden;
    background: ${props => props.theme.background};

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media (max-width: 768px) {
        width: 80px;
        height: 80px;
    }
`;

const ItemInfo = styled.div`
    h3 {
        margin: 0 0 0.5rem 0;
        color: ${props => props.theme.text};
    }

    p {
        margin: 0;
        color: ${props => props.theme.text}99;
        font-size: 0.9rem;
    }

    @media (max-width: 768px) {
        grid-column: 1 / -1;
        margin-top: 0.5rem;
    }
`;

const ItemActions = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 768px) {
        grid-column: 1 / -1;
        justify-content: space-between;
        margin-top: 1rem;
    }
`;

const QuantityControl = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: ${props => props.theme.background};
    padding: 0.5rem;
    border-radius: 8px;

    button {
        background: none;
        border: none;
        color: ${props => props.theme.primary};
        cursor: pointer;
        padding: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;

        &:hover {
            color: ${props => props.theme.secondary};
        }
    }

    span {
        min-width: 30px;
        text-align: center;
    }
`;

const DeleteButton = styled.button`
    background: none;
    border: none;
    color: ${props => props.theme.text}80;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover {
        color: #e53e3e;
        transform: scale(1.1);
    }
`;

const CartSummary = styled.div`
    background: ${props => props.theme.cardBg};
    border-radius: 15px;
    padding: 1.5rem;
    margin-top: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CheckoutButton = styled.button`
    background: ${props => props.theme.primary};
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    width: 100%;
    justify-content: center;

    &:hover {
        transform: translateY(-2px);
        background: ${props => props.theme.secondary};
    }

    svg {
        font-size: 1.2rem;
    }

    @media (max-width: 768px) {
        position: fixed;
        bottom: 1rem;
        left: 1rem;
        right: 1rem;
        width: calc(100% - 2rem);
        z-index: 100;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
`;

export default function Cart() {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Wireless Earbuds',
            price: 1299,
            quantity: 1,
            image: 'https://via.placeholder.com/100'
        },
        {
            id: 2,
            name: 'Smart Watch',
            price: 2499,
            quantity: 2,
            image: 'https://via.placeholder.com/100'
        },
        {
            id: 3,
            name: 'Bluetooth Speaker',
            price: 1999,
            quantity: 1,
            image: 'https://via.placeholder.com/100'
        }
    ]);

    const updateQuantity = (id, change) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const shipping = 99;
    const tax = calculateSubtotal() * 0.18; // 18% tax

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        navigate('/orders');
    };

    return (
        <Container theme={theme}>
            {/* Background Animations */}
            <FloatingIcon as={FaBox} size="4rem" left="5%" top="20%" duration="4s" theme={theme} />
            <FloatingIcon as={FaTruck} size="3.5rem" left="85%" top="15%" duration="5s" delay="0.5s" theme={theme} />
            <FloatingIcon as={FaMoneyBillWave} size="3rem" left="15%" top="60%" duration="4.5s" delay="1s" theme={theme} />
            <FloatingIcon as={FaShoppingCart} size="3.5rem" left="75%" top="70%" duration="4s" delay="1.5s" theme={theme} />

            <PulsingCircle size="200px" left="10%" top="30%" theme={theme} duration="4s" />
            <PulsingCircle size="150px" left="80%" top="60%" theme={theme} duration="5s" delay="1s" />
            <PulsingCircle size="180px" left="40%" top="80%" theme={theme} duration="4.5s" delay="2s" />

            <CartContainer>
                <CartHeader theme={theme}>
                    <h1>
                        <FaShoppingCart /> Shopping Cart
                    </h1>
                    <span>{cartItems.length} items</span>
                </CartHeader>

                <CartCard theme={theme}>
                    {cartItems.map(item => (
                        <CartItem key={item.id} theme={theme}>
                            <ItemImage theme={theme}>
                                <img src={item.image} alt={item.name} />
                            </ItemImage>
                            <ItemInfo theme={theme}>
                                <h3>{item.name}</h3>
                                <p>₹{item.price.toLocaleString()}</p>
                            </ItemInfo>
                            <ItemActions>
                                <QuantityControl theme={theme}>
                                    <button onClick={() => updateQuantity(item.id, -1)}>
                                        <FaMinus />
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)}>
                                        <FaPlus />
                                    </button>
                                </QuantityControl>
                                <DeleteButton theme={theme} onClick={() => removeItem(item.id)}>
                                    <FaTrash />
                                </DeleteButton>
                            </ItemActions>
                        </CartItem>
                    ))}
                </CartCard>

                <CartSummary theme={theme}>
                    <h2>Order Summary</h2>
                    <div className="summary-item">
                        <span>Subtotal</span>
                        <span>₹{calculateSubtotal().toLocaleString()}</span>
                    </div>
                    <div className="summary-item">
                        <span>Shipping</span>
                        <span>₹{shipping}</span>
                    </div>
                    <div className="summary-item total">
                        <span>Total</span>
                        <span>₹{(calculateSubtotal() + shipping + tax).toLocaleString()}</span>
                    </div>
                    <CheckoutButton 
                        theme={theme}
                        onClick={handleCheckout}
                        disabled={cartItems.length === 0}
                    >
                        <FaShoppingBag /> 
                        {cartItems.length === 0 ? 'Cart is Empty' : 'Proceed to Checkout'}
                    </CheckoutButton>
                </CartSummary>
            </CartContainer>
        </Container>
    );
}