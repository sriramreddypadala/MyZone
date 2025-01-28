import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { FaShoppingCart, FaTrash, FaPlus, FaMinus, FaBox, 
         FaTruck, FaMoneyBillWave, FaArrowRight, FaShoppingBag,
         FaArrowLeft, FaHeart, FaShare } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

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

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
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
        padding: 1rem 0.5rem;
    }
`;

const CartContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
`;

const CartContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 2rem;
    align-items: start;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr 280px;
        gap: 1.5rem;
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
`;

const CartItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const CartHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding: 0 1rem;

    h1 {
        font-size: 2rem;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 1rem;

        svg {
            color: ${props => props.theme.primary};
        }

        @media (max-width: 768px) {
            font-size: 1.5rem;
        }
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1rem;
    }
`;

const EmptyCartMessage = styled.div`
    text-align: center;
    padding: 3rem 1rem;
    
    svg {
        font-size: 4rem;
        color: ${props => props.theme.primary}40;
        margin-bottom: 1rem;
    }

    h2 {
        margin: 1rem 0;
        color: ${props => props.theme.text};
    }

    p {
        color: ${props => props.theme.text}99;
        margin-bottom: 2rem;
    }
`;

const ContinueShoppingButton = styled.button`
    background: none;
    border: 2px solid ${props => props.theme.primary};
    color: ${props => props.theme.primary};
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 1rem auto;
    transition: all 0.3s ease;

    &:hover {
        background: ${props => props.theme.primary}10;
        transform: translateY(-2px);
    }
`;

const CartItem = styled.div`
    display: grid;
    grid-template-columns: 100px 1fr auto;
    gap: 1.5rem;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid ${props => props.theme.text}10;
    background: ${props => props.theme.cardBg};
    border-radius: 12px;
    margin-bottom: 1rem;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
        grid-template-columns: 80px 1fr;
        grid-template-areas: 
            "image info"
            "image actions";
        padding: 1rem;
        gap: 0.75rem;
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
        grid-area: image;
    }
`;

const ItemInfo = styled.div`
    h3 {
        margin: 0 0 0.5rem 0;
        color: ${props => props.theme.text};
        font-size: 1.1rem;
    }

    .price {
        font-size: 1.2rem;
        font-weight: 600;
        color: ${props => props.theme.primary};
        margin: 0.5rem 0;
    }

    .stock {
        font-size: 0.9rem;
        color: #48bb78;
    }

    .category {
        font-size: 0.85rem;
        color: ${props => props.theme.text}80;
        margin-top: 0.5rem;
    }

    @media (max-width: 768px) {
        grid-area: info;

        h3 {
            font-size: 1rem;
            margin-bottom: 0.25rem;
        }
        
        .price {
            font-size: 1.1rem;
            margin: 0.25rem 0;
        }

        .stock, .category {
            font-size: 0.8rem;
        }
    }
`;

const ItemActions = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        grid-area: actions;
        gap: 0.75rem;
        justify-content: flex-start;
    }
`;

const QuantityControl = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: ${props => props.theme.background};
    padding: 0.25rem;
    border-radius: 8px;

    button {
        background: none;
        border: none;
        color: ${props => props.theme.primary};
        cursor: pointer;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: all 0.2s ease;

        &:hover {
            background: ${props => props.theme.primary}20;
        }

        &:disabled {
            color: ${props => props.theme.text}40;
            cursor: not-allowed;
        }
    }

    span {
        min-width: 30px;
        text-align: center;
        font-weight: 500;
    }

    @media (max-width: 768px) {
        button {
            width: 24px;
            height: 24px;
        }

        span {
            min-width: 24px;
            font-size: 0.9rem;
        }
    }
`;

const ActionButton = styled.button`
    background: none;
    border: none;
    color: ${props => props.theme.text}80;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 6px;
    font-size: 0.9rem;
    transition: all 0.2s ease;

    &:hover {
        color: ${props => props.theme.primary};
        background: ${props => props.theme.primary}10;
    }

    @media (max-width: 768px) {
        padding: 0.4rem;
        font-size: 0.85rem;

        svg {
            font-size: 0.9rem;
        }

        span {
            display: none;
        }
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

const LoadingSpinner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    
    &:before {
        content: '';
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 3px solid ${props => props.theme.text}20;
        border-top-color: ${props => props.theme.primary};
        animation: ${spin} 1s linear infinite;
        margin-bottom: 1rem;
    }

    &:after {
        content: 'Loading your cart...';
        color: ${props => props.theme.text}80;
        font-size: 1rem;
    }
`;

const CartSummary = styled.div`
    background: ${props => props.theme.cardBg};
    border-radius: 12px;
    padding: 1.5rem;
    height: fit-content;
    position: sticky;
    top: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    h2 {
        margin: 0 0 1.5rem 0;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;

        svg {
            color: ${props => props.theme.primary};
        }
    }

    @media (max-width: 768px) {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        top: auto;
        border-radius: 12px 12px 0 0;
        padding: 1rem;
        box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
        z-index: 100;
        background: ${props => props.theme.background};

        h2 {
            font-size: 1.2rem;
            margin-bottom: 1rem;
        }
    }
`;

const SummaryItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    color: ${props => props.theme.text}99;
    font-size: 0.95rem;

    &.total {
        margin-top: 1.5rem;
        padding-top: 1rem;
        border-top: 1px solid ${props => props.theme.text}20;
        font-size: 1.1rem;
        font-weight: 600;
        color: ${props => props.theme.text};
    }

    @media (max-width: 768px) {
        font-size: 0.9rem;
        margin-bottom: 0.75rem;

        &.total {
            margin-top: 1rem;
            padding-top: 0.75rem;
            font-size: 1rem;
        }
    }
`;

const CheckoutButton = styled.button`
    width: 100%;
    background: ${props => props.theme.primary};
    color: white;
    border: none;
    padding: 1rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 1.5rem;
    transition: all 0.3s ease;

    &:hover {
        background: ${props => props.theme.primary}dd;
        transform: translateY(-2px);
    }

    @media (max-width: 768px) {
        padding: 0.75rem;
        margin-top: 1rem;
        font-size: 0.95rem;
    }
`;

export default function Cart() {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const { cart, removeFromCart, updateQuantity } = useCart();
    
    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? 99 : 0;
    const tax = subtotal * 0.18;

    const handleUpdateQuantity = (itemId, newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= 10) {
            updateQuantity(itemId, newQuantity);
        }
    };

    const handleRemoveItem = (itemId) => {
        removeFromCart(itemId);
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const handleContinueShopping = () => {
        navigate('/');
    };

    if (isLoading) {
        return (
            <Container theme={theme}>
                <CartContainer>
                    <CartHeader>
                        <h1><FaShoppingCart /> Shopping Cart</h1>
                    </CartHeader>
                    <LoadingSpinner theme={theme} />
                </CartContainer>
            </Container>
        );
    }

    if (cart.length === 0) {
        return (
            <Container theme={theme}>
                <CartContainer>
                    <CartHeader>
                        <h1><FaShoppingCart /> Shopping Cart</h1>
                    </CartHeader>
                    <EmptyCartMessage>
                        <FaShoppingBag />
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added anything to your cart yet.</p>
                        <ContinueShoppingButton 
                            onClick={handleContinueShopping}
                            theme={theme}
                        >
                            <FaArrowLeft /> Continue Shopping
                        </ContinueShoppingButton>
                    </EmptyCartMessage>
                </CartContainer>
            </Container>
        );
    }

    return (
        <Container theme={theme}>
            <CartContainer>
                <CartHeader>
                    <h1><FaShoppingCart /> Shopping Cart</h1>
                    <span>{cart.length} {cart.length === 1 ? 'item' : 'items'}</span>
                </CartHeader>

                <CartContent>
                    <CartItemsContainer>
                        {cart.map(item => (
                            <CartItem key={item.id} theme={theme}>
                                <ItemImage theme={theme}>
                                    <img src={item.image} alt={item.name} />
                                </ItemImage>
                                
                                <ItemInfo theme={theme}>
                                    <h3>{item.name}</h3>
                                    <div className="price">${item.price.toFixed(2)}</div>
                                    <div className="stock">In Stock</div>
                                    <div className="category">{item.category}</div>
                                </ItemInfo>

                                <ItemActions>
                                    <QuantityControl theme={theme}>
                                        <button 
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <FaMinus />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button 
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                            disabled={item.quantity >= 10}
                                        >
                                            <FaPlus />
                                        </button>
                                    </QuantityControl>
                                    <ActionButton 
                                        onClick={() => {}} 
                                        theme={theme}
                                    >
                                        <FaHeart />
                                        <span>Save</span>
                                    </ActionButton>
                                    <ActionButton 
                                        onClick={() => {}} 
                                        theme={theme}
                                    >
                                        <FaShare />
                                        <span>Share</span>
                                    </ActionButton>
                                    <ActionButton 
                                        onClick={() => handleRemoveItem(item.id)} 
                                        theme={theme}
                                    >
                                        <FaTrash />
                                        <span>Remove</span>
                                    </ActionButton>
                                </ItemActions>
                            </CartItem>
                        ))}
                    </CartItemsContainer>

                    <CartSummary theme={theme}>
                        <h2>Order Summary</h2>
                        <SummaryItem>
                            <span>Subtotal ({cart.length} items)</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </SummaryItem>
                        <SummaryItem>
                            <span>Shipping</span>
                            <span>${shipping.toFixed(2)}</span>
                        </SummaryItem>
                        <SummaryItem>
                            <span>Tax (18%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </SummaryItem>
                        <SummaryItem className="total">
                            <span>Total</span>
                            <span>${(subtotal + shipping + tax).toFixed(2)}</span>
                        </SummaryItem>
                        <CheckoutButton 
                            theme={theme}
                            onClick={handleCheckout}
                        >
                            <FaArrowRight /> Proceed to Checkout
                        </CheckoutButton>
                    </CartSummary>
                </CartContent>
            </CartContainer>
        </Container>
    );
}