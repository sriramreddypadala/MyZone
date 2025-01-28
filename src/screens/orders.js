import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { FaShoppingBag, FaTruck, FaCreditCard, FaCheck, FaMapMarkerAlt, 
         FaBox, FaClipboardList, FaArrowLeft, FaStar, FaDownload,
         FaCalendarAlt, FaPhoneAlt, FaEnvelope, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Animation keyframes
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.background};
  padding: 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;

  h1 {
    font-size: 2rem;
    color: ${props => props.theme.text};
    margin: 0;
    display: flex;
    align-items: center;
    gap: 1rem;

    svg {
      color: ${props => props.theme.primary};
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;

    h1 {
      font-size: 1.5rem;
    }
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${props => props.theme.cardBg};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  width: 300px;

  input {
    border: none;
    background: none;
    color: ${props => props.theme.text};
    width: 100%;
    padding: 0.5rem;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${props => props.theme.text}80;
    }
  }

  svg {
    color: ${props => props.theme.text}80;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme.background};
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary}40;
    border-radius: 4px;
  }
`;

const Tab = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? props.theme.primary : props.theme.cardBg};
  color: ${props => props.active ? 'white' : props.theme.text};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: fit-content;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const OrdersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const OrderCard = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.text}20;

  .order-id {
    font-weight: bold;
    color: ${props => props.theme.primary};
  }

  .order-date {
    color: ${props => props.theme.text}80;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const OrderStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  
  ${props => {
    switch (props.status) {
      case 'delivered':
        return `
          background: #48BB7820;
          color: #48BB78;
        `;
      case 'processing':
        return `
          background: #4299E120;
          color: #4299E1;
        `;
      case 'cancelled':
        return `
          background: #F5656520;
          color: #F56565;
        `;
      default:
        return `
          background: ${props.theme.text}20;
          color: ${props.theme.text};
        `;
    }
  }}
`;

const OrderItems = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  overflow-x: auto;
  padding-bottom: 0.5rem;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme.background};
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary}40;
    border-radius: 4px;
  }
`;

const ItemImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const OrderFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.text}20;

  .total {
    font-weight: bold;
    color: ${props => props.theme.text};
  }

  .actions {
    display: flex;
    gap: 1rem;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.primary}20;
  }
`;

export default function Orders() {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [orders, setOrders] = useState([
        {
            id: 'ORD-001',
            date: '2024-01-28',
            status: 'delivered',
            items: [
                { id: 1, name: 'Wireless Earbuds', image: 'https://via.placeholder.com/60' },
                { id: 2, name: 'Smart Watch', image: 'https://via.placeholder.com/60' },
            ],
            total: 299.99
        },
        {
            id: 'ORD-002',
            date: '2024-01-27',
            status: 'processing',
            items: [
                { id: 3, name: 'Laptop Stand', image: 'https://via.placeholder.com/60' },
            ],
            total: 49.99
        },
        {
            id: 'ORD-003',
            date: '2024-01-26',
            status: 'cancelled',
            items: [
                { id: 4, name: 'Mechanical Keyboard', image: 'https://via.placeholder.com/60' },
                { id: 5, name: 'Mouse Pad', image: 'https://via.placeholder.com/60' },
            ],
            total: 159.99
        }
    ]);

    const filteredOrders = orders.filter(order => {
        if (activeTab !== 'all' && order.status !== activeTab) return false;
        if (searchQuery && !order.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const handleOrderClick = (orderId) => {
        // Navigate to order details page
        navigate(`/order/${orderId}`);
    };

    const handleDownloadInvoice = (e, orderId) => {
        e.stopPropagation();
        // Handle invoice download
        console.log('Downloading invoice for order:', orderId);
    };

    const handleTrackOrder = (e, orderId) => {
        e.stopPropagation();
        // Handle order tracking
        console.log('Tracking order:', orderId);
    };

    return (
        <Container theme={theme}>
            <Header>
                <h1>
                    <FaClipboardList /> My Orders
                </h1>
                <SearchBar theme={theme}>
                    <FaSearch />
                    <input 
                        type="text" 
                        placeholder="Search orders..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </SearchBar>
            </Header>

            <TabContainer>
                <Tab 
                    active={activeTab === 'all'} 
                    onClick={() => setActiveTab('all')}
                    theme={theme}
                >
                    All Orders
                </Tab>
                <Tab 
                    active={activeTab === 'processing'} 
                    onClick={() => setActiveTab('processing')}
                    theme={theme}
                >
                    Processing
                </Tab>
                <Tab 
                    active={activeTab === 'delivered'} 
                    onClick={() => setActiveTab('delivered')}
                    theme={theme}
                >
                    Delivered
                </Tab>
                <Tab 
                    active={activeTab === 'cancelled'} 
                    onClick={() => setActiveTab('cancelled')}
                    theme={theme}
                >
                    Cancelled
                </Tab>
            </TabContainer>

            <OrdersGrid>
                {filteredOrders.map(order => (
                    <OrderCard 
                        key={order.id} 
                        theme={theme}
                        onClick={() => handleOrderClick(order.id)}
                    >
                        <OrderHeader theme={theme}>
                            <span className="order-id">{order.id}</span>
                            <span className="order-date">
                                <FaCalendarAlt />
                                {new Date(order.date).toLocaleDateString()}
                            </span>
                        </OrderHeader>

                        <OrderStatus status={order.status} theme={theme}>
                            <FaCheck />
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </OrderStatus>

                        <OrderItems theme={theme}>
                            {order.items.map(item => (
                                <ItemImage key={item.id} theme={theme}>
                                    <img src={item.image} alt={item.name} />
                                </ItemImage>
                            ))}
                        </OrderItems>

                        <OrderFooter theme={theme}>
                            <span className="total">
                                Total: ${order.total.toFixed(2)}
                            </span>
                            <div className="actions">
                                <ActionButton 
                                    theme={theme}
                                    onClick={(e) => handleDownloadInvoice(e, order.id)}
                                >
                                    <FaDownload /> Invoice
                                </ActionButton>
                                {order.status === 'processing' && (
                                    <ActionButton 
                                        theme={theme}
                                        onClick={(e) => handleTrackOrder(e, order.id)}
                                    >
                                        <FaTruck /> Track
                                    </ActionButton>
                                )}
                            </div>
                        </OrderFooter>
                    </OrderCard>
                ))}
            </OrdersGrid>
        </Container>
    );
}