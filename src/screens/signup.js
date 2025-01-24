import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaShoppingCart, FaBox, FaTruck, FaShoppingBag, FaStore, FaGift, FaCreditCard, FaTags } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(145deg, #f0f3f9 0%, #dde4ec 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
`;

const SignupCard = styled.div`
  background: #e6edf7;
  padding: 2.5rem 2rem;
  border-radius: 25px;
  box-shadow: 20px 20px 40px #c3cad3,
              -20px -20px 40px #ffffff;
  width: 100%;
  max-width: 450px;
  z-index: 1;
  transition: all 0.3s ease;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
    box-shadow: 15px 15px 30px #c3cad3,
                -15px -15px 30px #ffffff;
  }
`;

const Title = styled.h1`
  color: #2d3748;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.2rem;
  font-weight: 600;
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`;

const Subtitle = styled.p`
  color: #4a5568;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1rem;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
  width: 100%;
  box-sizing: border-box;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.2rem;
  border: none;
  border-radius: 12px;
  background: #e6edf7;
  box-shadow: inset 5px 5px 10px #c3cad3,
              inset -5px -5px 10px #ffffff;
  transition: all 0.3s ease;
  color: #2d3748;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    box-shadow: inset 4px 4px 8px #c3cad3,
                inset -4px -4px 8px #ffffff;
  }

  &::placeholder {
    color: #a0aec0;
  }

  @media (max-width: 480px) {
    padding: 0.9rem 1rem;
    font-size: 0.95rem;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  margin-top: 2rem;
  border: none;
  border-radius: 12px;
  background: #4299e1;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 6px 6px 12px #c3cad3,
              -6px -6px 12px #ffffff;
  transition: all 0.3s ease;

  &:hover {
    background: #3182ce;
    transform: translateY(-2px);
    box-shadow: 8px 8px 16px #c3cad3,
                -8px -8px 16px #ffffff;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 4px 4px 8px #c3cad3,
                -4px -4px 8px #ffffff;
  }

  @media (max-width: 480px) {
    padding: 0.9rem;
    margin-top: 1.5rem;
    font-size: 0.95rem;
  }
`;

const FloatingIcon = styled.div`
  position: absolute;
  color: rgba(66, 153, 225, 0.08);
  font-size: ${props => props.size || '2rem'};
  animation: ${float} ${props => props.duration || '3s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  left: ${props => props.left};
  top: ${props => props.top};
  z-index: 0;

  @media (max-width: 480px) {
    font-size: calc(${props => props.size || '2rem'} * 0.8);
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #4a5568;
  font-size: 0.9rem;

  a {
    color: #4299e1;
    text-decoration: none;
    font-weight: 500;
    margin-left: 0.5rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function Signup() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here
        navigate('/');
    };

    return (
        <Container>
            {/* E-commerce themed background animations */}
            <FloatingIcon as={FaShoppingCart} size="3.5rem" left="10%" top="15%" duration="4s" />
            <FloatingIcon as={FaStore} size="3rem" left="85%" top="20%" duration="5s" delay="0.5s" />
            <FloatingIcon as={FaGift} size="2.8rem" left="20%" top="75%" duration="4.5s" delay="1s" />
            <FloatingIcon as={FaBox} size="3.2rem" left="75%" top="70%" duration="3.5s" delay="1.5s" />
            <FloatingIcon as={FaTruck} size="3rem" left="15%" top="40%" duration="4s" delay="2s" />
            <FloatingIcon as={FaTags} size="2.5rem" left="80%" top="45%" duration="4.2s" delay="0.8s" />
            <FloatingIcon as={FaCreditCard} size="2.8rem" left="40%" top="85%" duration="3.8s" delay="1.2s" />
            <FloatingIcon as={FaShoppingBag} size="2.6rem" left="70%" top="25%" duration="4.8s" delay="1.8s" />
            
            <SignupCard>
                <Title>Create Account</Title>
                <Subtitle>Join our e-commerce community and start shopping!</Subtitle>
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <Button type="submit">Create Account</Button>
                    <LoginLink>
                        Already have an account?
                        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                            Sign In
                        </a>
                    </LoginLink>
                </form>
            </SignupCard>
        </Container>
    );
}