import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { FaBox, FaTruck, FaCheck, FaMapMarkerAlt, FaSearch, FaFilter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.theme.cardBackground};
  border-radius: 8px;
  padding: 0.5rem 1rem;
  flex: 1;
  max-width: 400px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  input {
    border: none;
    background: none;
    margin-left: 0.5rem;
    flex: 1;
    color: ${props => props.theme.text};
    &:focus {
      outline: none;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.secondary};
  }
`;

const OrderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const OrderCard = styled.div`
  background: ${props => props.theme.cardBackground};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.border};
`;

const OrderId = styled.span`
  font-weight: bold;
  color: ${props => props.theme.primary};
`;

const OrderDate = styled.span`
  color: ${props => props.theme.textSecondary};
  font-size: 0.9rem;
`;

const TrackingContainer = styled.div`
  margin-top: 1rem;
`;

const TrackingStep = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  opacity: ${props => props.completed ? 1 : 0.5};
`;

const StepIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.completed ? props.theme.primary : props.theme.border};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;

const StepInfo = styled.div`
  flex: 1;
`;

const StepTitle = styled.div`
  font-weight: bold;
  color: ${props => props.completed ? props.theme.text : props.theme.textSecondary};
`;

const StepDate = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.textSecondary};
`;

const OrderDetails = styled.div`
  margin: 1rem 0;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  
  span:last-child {
    font-weight: bold;
  }
`;

const ViewDetailsButton = styled.button`
  background: none;
  border: 2px solid ${props => props.theme.primary};
  color: ${props => props.theme.primary};
  padding: 0.5rem 1rem;
  border-radius: 6px;
  width: 100%;
  margin-top: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.primary};
    color: white;
  }
`;

export default function ConfirmedOrders() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [orders] = useState([
    {
      id: 'ORD123456',
      date: '2025-01-24',
      total: 1299,
      items: 3,
      status: 'In Transit',
      tracking: [
        { step: 'Order Placed', completed: true, date: '2025-01-24 10:30 AM', icon: FaBox },
        { step: 'Order Confirmed', completed: true, date: '2025-01-24 11:00 AM', icon: FaCheck },
        { step: 'Out for Delivery', completed: true, date: '2025-01-24 2:30 PM', icon: FaTruck },
        { step: 'Delivered', completed: false, date: 'Expected by 2025-01-25', icon: FaMapMarkerAlt }
      ]
    },
    {
      id: 'ORD123457',
      date: '2025-01-23',
      total: 899,
      items: 2,
      status: 'Delivered',
      tracking: [
        { step: 'Order Placed', completed: true, date: '2025-01-23 09:30 AM', icon: FaBox },
        { step: 'Order Confirmed', completed: true, date: '2025-01-23 10:00 AM', icon: FaCheck },
        { step: 'Out for Delivery', completed: true, date: '2025-01-23 1:30 PM', icon: FaTruck },
        { step: 'Delivered', completed: true, date: '2025-01-23 5:45 PM', icon: FaMapMarkerAlt }
      ]
    }
  ]);

  const renderTrackingSteps = (tracking) => {
    return tracking.map((step, index) => (
      <TrackingStep key={index} completed={step.completed}>
        <StepIcon completed={step.completed} theme={theme}>
          <step.icon />
        </StepIcon>
        <StepInfo>
          <StepTitle completed={step.completed}>{step.step}</StepTitle>
          <StepDate>{step.date}</StepDate>
        </StepInfo>
      </TrackingStep>
    ));
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container theme={theme}>
      <Header>
        <h1>My Orders</h1>
        <SearchBar theme={theme}>
          <FaSearch />
          <input
            type="text"
            placeholder="Search by Order ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBar>
        <FilterButton theme={theme}>
          <FaFilter /> Filter
        </FilterButton>
      </Header>

      <OrderGrid>
        {filteredOrders.map(order => (
          <OrderCard key={order.id} theme={theme}>
            <OrderHeader theme={theme}>
              <OrderId theme={theme}>{order.id}</OrderId>
              <OrderDate>{order.date}</OrderDate>
            </OrderHeader>

            <OrderDetails>
              <OrderItem>
                <span>Items</span>
                <span>{order.items}</span>
              </OrderItem>
              <OrderItem>
                <span>Total</span>
                <span>₹{order.total}</span>
              </OrderItem>
              <OrderItem>
                <span>Status</span>
                <span style={{ color: theme.primary }}>{order.status}</span>
              </OrderItem>
            </OrderDetails>

            <TrackingContainer>
              {renderTrackingSteps(order.tracking)}
            </TrackingContainer>

            <ViewDetailsButton 
              theme={theme}
              onClick={() => navigate(`/order/${order.id}`)}
            >
              View Details
            </ViewDetailsButton>
          </OrderCard>
        ))}
      </OrderGrid>
    </Container>
  );
}