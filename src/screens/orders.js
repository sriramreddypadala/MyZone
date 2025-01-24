import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { FaShoppingBag, FaTruck, FaCreditCard, FaCheck, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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

const AnimatedBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  pointer-events: none;

  .shopping-bag {
    position: absolute;
    font-size: 3rem;
    color: ${props => props.theme.primary}20;
    animation: ${float} 6s ease-in-out infinite;
  }

  .truck {
    position: absolute;
    font-size: 4rem;
    color: ${props => props.theme.secondary}20;
    animation: ${float} 8s ease-in-out infinite;
  }
`;

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.theme.primary}40;
    transform: translateY(-50%);
    z-index: -1;
  }

  @media (max-width: 768px) {
    overflow-x: auto;
    padding-bottom: 1rem;
    gap: 1rem;

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
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 120px;

  .icon-container {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${props => props.active ? props.theme.primary : props.theme.cardBg};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.active ? 'white' : props.theme.text};
    transition: all 0.3s ease;
    animation: ${props => props.active ? pulse : 'none'} 2s infinite;
  }

  .step-label {
    font-size: 0.9rem;
    color: ${props => props.active ? props.theme.primary : props.theme.text};
    font-weight: ${props => props.active ? 'bold' : 'normal'};
  }
`;

const ContentContainer = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 15px;
  padding: 2rem;
  margin-top: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.5s ease-out;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    color: ${props => props.theme.text};
    font-weight: 500;
  }

  input, select {
    padding: 0.8rem;
    border: 2px solid ${props => props.theme.primary}40;
    border-radius: 8px;
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: ${props => props.theme.primary};
      box-shadow: 0 0 0 2px ${props => props.theme.primary}20;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  ${props => props.primary ? `
    background: ${props.theme.primary};
    color: white;
    
    &:hover {
      background: ${props.theme.primary}dd;
      transform: translateY(-2px);
    }
  ` : `
    background: ${props.theme.cardBg};
    color: ${props.theme.text};
    border: 2px solid ${props.theme.primary}40;
    
    &:hover {
      background: ${props.theme.background};
      transform: translateY(-2px);
    }
  `}
`;

const PaymentMethodContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const PaymentMethod = styled.div`
  padding: 1.5rem;
  border: 2px solid ${props => props.selected ? props.theme.primary : `${props.theme.primary}40`};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${props => props.selected ? `${props.theme.primary}10` : 'transparent'};

  &:hover {
    transform: translateY(-2px);
    border-color: ${props => props.theme.primary};
  }

  .icon {
    font-size: 1.5rem;
    color: ${props => props.theme.primary};
  }
`;

const OrderSummary = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid ${props => props.theme.primary}20;

  .summary-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    color: ${props => props.theme.text};

    &.total {
      font-weight: bold;
      font-size: 1.2rem;
      color: ${props => props.theme.primary};
    }
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.2rem;
`;

export default function Orders() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: ''
  });
  const [errors, setErrors] = useState({});

  const validateStep = (step) => {
    const newErrors = {};
    
    switch(step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) {
          newErrors.phone = 'Phone is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
          newErrors.phone = 'Phone number must be 10 digits';
        }
        break;

      case 2:
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.pincode.trim()) {
          newErrors.pincode = 'Pincode is required';
        } else if (!/^\d{6}$/.test(formData.pincode)) {
          newErrors.pincode = 'Pincode must be 6 digits';
        }
        break;

      case 3:
        if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select a payment method';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }

    if (currentStep === 3) {
      if (formData.paymentMethod === 'razorpay') {
        try {
          await initiatePayment();
        } catch (error) {
          setErrors({ payment: 'Payment failed. Please try again.' });
          return;
        }
      } else {
        // Handle COD
        setCurrentStep(4);
      }
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const renderError = (field) => {
    return errors[field] ? (
      <ErrorMessage>{errors[field]}</ErrorMessage>
    ) : null;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <label>Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'error' : ''}
              />
              {renderError('name')}
            </InputGroup>
            <InputGroup>
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'error' : ''}
              />
              {renderError('email')}
            </InputGroup>
            <InputGroup>
              <label>Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={errors.phone ? 'error' : ''}
                maxLength={10}
              />
              {renderError('phone')}
            </InputGroup>
            <ButtonGroup>
              <Button onClick={() => navigate('/cart')}>Back to Cart</Button>
              <Button primary type="submit">Continue to Address</Button>
            </ButtonGroup>
          </Form>
        );

      case 2:
        return (
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <label>Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={errors.address ? 'error' : ''}
              />
              {renderError('address')}
            </InputGroup>
            <InputGroup>
              <label>City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className={errors.city ? 'error' : ''}
              />
              {renderError('city')}
            </InputGroup>
            <InputGroup>
              <label>State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className={errors.state ? 'error' : ''}
              />
              {renderError('state')}
            </InputGroup>
            <InputGroup>
              <label>Pincode</label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                className={errors.pincode ? 'error' : ''}
                maxLength={6}
              />
              {renderError('pincode')}
            </InputGroup>
            <ButtonGroup>
              <Button onClick={() => setCurrentStep(1)}>Back</Button>
              <Button primary type="submit">Continue to Payment</Button>
            </ButtonGroup>
          </Form>
        );

      case 3:
        return (
          <Form onSubmit={handleSubmit}>
            <PaymentMethodContainer>
              <PaymentMethod
                selected={formData.paymentMethod === 'razorpay'}
                onClick={() => handleInputChange('paymentMethod', 'razorpay')}
                className={errors.paymentMethod ? 'error' : ''}
              >
                <FaCreditCard className="icon" />
                <div>
                  <h3>Credit/Debit Card</h3>
                  <p>Pay securely with Razorpay</p>
                </div>
              </PaymentMethod>
              <PaymentMethod
                selected={formData.paymentMethod === 'cod'}
                onClick={() => handleInputChange('paymentMethod', 'cod')}
                className={errors.paymentMethod ? 'error' : ''}
              >
                <FaTruck className="icon" />
                <div>
                  <h3>Cash on Delivery</h3>
                  <p>Pay when you receive</p>
                </div>
              </PaymentMethod>
            </PaymentMethodContainer>
            {renderError('paymentMethod')}
            {renderError('payment')}
            
            <OrderSummary>
              <div className="summary-item">
                <span>Subtotal</span>
                <span>₹899</span>
              </div>
              <div className="summary-item">
                <span>Shipping</span>
                <span>₹101</span>
              </div>
              <div className="summary-item total">
                <span>Total</span>
                <span>₹1000</span>
              </div>
            </OrderSummary>

            <ButtonGroup>
              <Button onClick={() => setCurrentStep(2)}>Back</Button>
              <Button 
                primary 
                type="submit"
                disabled={!formData.paymentMethod}
              >
                Place Order
              </Button>
            </ButtonGroup>
          </Form>
        );

      case 4:
        return (
          <div style={{ textAlign: 'center' }}>
            <FaCheck style={{ fontSize: '4rem', color: theme.primary, marginBottom: '1rem' }} />
            <h2>Order Confirmed!</h2>
            <p>Thank you for your purchase. Your order has been placed successfully.</p>
            <p>Order ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <ButtonGroup style={{ justifyContent: 'center' }}>
              <Button primary onClick={() => navigate('/')}>Continue Shopping</Button>
            </ButtonGroup>
          </div>
        );

      default:
        return null;
    }
  };

  // Razorpay Integration
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async () => {
    const res = await loadRazorpay();
    if (!res) {
      alert('Razorpay SDK failed to load');
      return;
    }

    // Replace with your order creation API
    const orderAmount = 1000; // Amount in paise
    const options = {
      key: 'YOUR_RAZORPAY_KEY', // Replace with your key
      amount: orderAmount,
      currency: 'INR',
      name: 'Your Store Name',
      description: 'Purchase Description',
      handler: function (response) {
        // Handle payment success
        alert('Payment successful: ' + response.razorpay_payment_id);
        setCurrentStep(4); // Move to confirmation step
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone
      },
      theme: {
        color: theme.primary
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // Generate animated background elements
  const renderAnimatedBackground = () => {
    const elements = [];
    for (let i = 0; i < 5; i++) {
      elements.push(
        <FaShoppingBag
          key={`bag-${i}`}
          className="shopping-bag"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      );
      elements.push(
        <FaTruck
          key={`truck-${i}`}
          className="truck"
          style={{
            top: `${Math.random() * 100}%`,
            right: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      );
    }
    return elements;
  };

  return (
    <Container theme={theme}>
      <AnimatedBackground>
        {renderAnimatedBackground()}
      </AnimatedBackground>

      <StepContainer>
        <Step active={currentStep >= 1}>
          <div className="icon-container">
            <FaShoppingBag />
          </div>
          <span className="step-label">Details</span>
        </Step>
        <Step active={currentStep >= 2}>
          <div className="icon-container">
            <FaMapMarkerAlt />
          </div>
          <span className="step-label">Address</span>
        </Step>
        <Step active={currentStep >= 3}>
          <div className="icon-container">
            <FaCreditCard />
          </div>
          <span className="step-label">Payment</span>
        </Step>
        <Step active={currentStep >= 4}>
          <div className="icon-container">
            <FaCheck />
          </div>
          <span className="step-label">Confirmation</span>
        </Step>
      </StepContainer>

      <ContentContainer theme={theme}>
        {renderStepContent()}
      </ContentContainer>
    </Container>
  );
}