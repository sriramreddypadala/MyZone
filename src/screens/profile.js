import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaUser, FaEnvelope, FaPhone, FaPalette, FaCog, FaCamera, 
         FaMoon, FaSun, FaWater, FaMountain, FaCrown } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
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

const ProfileCard = styled.div`
    background: ${props => props.theme.cardBg};
    border-radius: 20px;
    padding: 2rem;
    max-width: 800px;
    margin: 2rem auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
        padding: 1rem;
        margin: 1rem auto;
    }
`;

const ProfileHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
    }
`;

const ProfileImage = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: ${props => props.theme.cardBg};
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &:hover .overlay {
        opacity: 1;
    }
`;

const ImageOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.primary}80;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    cursor: pointer;

    svg {
        color: white;
        font-size: 2rem;
    }
`;

const ProfileInfo = styled.div`
    flex: 1;

    h1 {
        margin: 0;
        color: ${props => props.theme.text};
        font-size: 2rem;
    }

    p {
        margin: 0.5rem 0;
        color: ${props => props.theme.text}99;
    }
`;

const Section = styled.div`
    margin: 2rem 0;

    h2 {
        color: ${props => props.theme.text};
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }
`;

const ThemeGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
`;

const ThemeOption = styled.div`
    padding: 1rem;
    border-radius: 10px;
    background: ${props => props.theme.cardBg};
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    border: 2px solid ${props => props.isSelected ? props.theme.primary : 'transparent'};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    svg {
        color: ${props => props.isSelected ? props.theme.primary : props.theme.text}80;
        font-size: 1.2rem;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
`;

const InfoItem = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1rem 0;
    padding: 1rem;
    background: ${props => props.theme.cardBg}20;
    border-radius: 10px;
    transition: all 0.3s ease;

    &:hover {
        background: ${props => props.theme.cardBg}40;
    }

    svg {
        color: ${props => props.theme.primary};
        font-size: 1.5rem;
    }

    p {
        color: ${props => props.theme.text};
        margin: 0;
    }
`;

const EditButton = styled.button`
    background: ${props => props.theme.primary};
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        background: ${props => props.theme.primary}90;
    }
`;

const SubscriptionCard = styled.div`
    background: ${props => props.theme.cardBg};
    border-radius: 15px;
    padding: 1.5rem;
    margin: 1rem 0;
    border: 2px solid ${props => props.featured ? props.theme.primary : 'transparent'};
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    ${props => props.featured && `
        &:before {
            content: 'Popular';
            position: absolute;
            top: 10px;
            right: -30px;
            background: ${props.theme.primary};
            color: white;
            padding: 5px 40px;
            transform: rotate(45deg);
            font-size: 0.8rem;
        }
    `}
`;

const PlanTitle = styled.h3`
    color: ${props => props.theme.text};
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
        color: ${props => props.theme.primary};
    }
`;

const PlanPrice = styled.div`
    font-size: 2rem;
    color: ${props => props.theme.text};
    margin: 1rem 0;
    font-weight: bold;

    span {
        font-size: 1rem;
        opacity: 0.7;
    }
`;

const PlanFeatures = styled.ul`
    list-style: none;
    padding: 0;
    margin: 1rem 0;

    li {
        color: ${props => props.theme.text}CC;
        margin: 0.5rem 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        &:before {
            content: '✓';
            color: ${props => props.theme.primary};
        }
    }
`;

const SubscribeButton = styled.button`
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 8px;
    background: ${props => props.featured ? props.theme.primary : props.theme.cardBg};
    color: ${props => props.featured ? 'white' : props.theme.text};
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid ${props => props.featured ? 'transparent' : props.theme.primary};

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        background: ${props => props.featured ? props.theme.primary + 'DD' : props.theme.primary};
        color: white;
    }
`;

const SubscriptionGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
`;

export default function Profile() {
    const { theme, currentTheme, setCurrentTheme } = useTheme();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 890',
        image: 'https://via.placeholder.com/150'
    });

    const themeOptions = [
        { name: 'light', icon: FaSun, label: 'Light' },
        { name: 'dark', icon: FaMoon, label: 'Dark' },
        { name: 'ocean', icon: FaWater, label: 'Ocean' },
        { name: 'sunset', icon: FaMountain, label: 'Sunset' }
    ];

    const subscriptionPlans = [
        {
            id: 'basic',
            title: 'Basic',
            price: '499',
            period: 'month',
            features: [
                'Access to all basic features',
                'Customer support',
                'Up to 10 projects',
                'Basic analytics'
            ],
            featured: false
        },
        {
            id: 'pro',
            title: 'Pro',
            price: '999',
            period: 'month',
            features: [
                'All Basic features',
                'Priority support',
                'Unlimited projects',
                'Advanced analytics',
                'Custom themes'
            ],
            featured: true
        },
        {
            id: 'enterprise',
            title: 'Enterprise',
            price: '1999',
            period: 'month',
            features: [
                'All Pro features',
                'Dedicated support',
                'Custom integrations',
                'API access',
                'White-label options'
            ],
            featured: false
        }
    ];

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleSubscription = async (plan) => {
        const options = {
            key: 'rzp_test_1DP5mmOlF5G5ag', // Replace with your test key
            subscription_id: plan.id,
            name: 'Your Company Name',
            description: `${plan.title} Plan Subscription`,
            image: 'your_logo_url',
            handler: function (response) {
                alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
                // Here you would typically make an API call to your backend to verify and record the payment
            },
            prefill: {
                name: userData.name,
                email: userData.email,
                contact: userData.phone
            },
            theme: {
                color: '#6772E5'
            }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    return (
        <Container theme={theme}>
            {/* Background Animations */}
            <FloatingIcon as={FaUser} size="4rem" left="5%" top="20%" duration="4s" theme={theme} />
            <FloatingIcon as={FaPalette} size="3.5rem" left="85%" top="15%" duration="5s" delay="0.5s" theme={theme} />
            <FloatingIcon as={FaCog} size="3rem" left="15%" top="60%" duration="4.5s" delay="1s" theme={theme} />
            <FloatingIcon as={FaCamera} size="3.5rem" left="75%" top="70%" duration="4s" delay="1.5s" theme={theme} />

            <PulsingCircle size="200px" left="10%" top="30%" theme={theme} duration="4s" />
            <PulsingCircle size="150px" left="80%" top="60%" theme={theme} duration="5s" delay="1s" />
            <PulsingCircle size="180px" left="40%" top="80%" theme={theme} duration="4.5s" delay="2s" />

            <ProfileCard theme={theme}>
                <ProfileHeader>
                    <ProfileImage theme={theme}>
                        <img src={userData.image} alt="Profile" />
                        <ImageOverlay className="overlay" theme={theme}>
                            <FaCamera />
                        </ImageOverlay>
                    </ProfileImage>
                    <ProfileInfo theme={theme}>
                        <h1>{userData.name}</h1>
                        <p>Premium Member</p>
                        <EditButton theme={theme}>
                            <FaCog /> Edit Profile
                        </EditButton>
                    </ProfileInfo>
                </ProfileHeader>

                <Section theme={theme}>
                    <h2>Contact Information</h2>
                    <InfoItem theme={theme}>
                        <FaEnvelope />
                        <div>
                            <p>{userData.email}</p>
                        </div>
                    </InfoItem>
                    <InfoItem theme={theme}>
                        <FaPhone />
                        <div>
                            <p>{userData.phone}</p>
                        </div>
                    </InfoItem>
                </Section>

                <Section theme={theme}>
                    <h2>Theme Preferences</h2>
                    <ThemeGrid>
                        {themeOptions.map(option => (
                            <ThemeOption 
                                key={option.name}
                                onClick={() => setCurrentTheme(option.name)}
                                isSelected={currentTheme === option.name}
                                theme={theme}
                            >
                                <option.icon />
                                {option.label}
                            </ThemeOption>
                        ))}
                    </ThemeGrid>
                </Section>

                <Section theme={theme}>
                    <h2>Subscription Plans</h2>
                    <SubscriptionGrid>
                        {subscriptionPlans.map(plan => (
                            <SubscriptionCard 
                                key={plan.id} 
                                theme={theme}
                                featured={plan.featured}
                            >
                                <PlanTitle theme={theme}>
                                    <FaCrown />
                                    {plan.title}
                                </PlanTitle>
                                <PlanPrice theme={theme}>
                                    ₹{plan.price}<span>/{plan.period}</span>
                                </PlanPrice>
                                <PlanFeatures theme={theme}>
                                    {plan.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </PlanFeatures>
                                <SubscribeButton
                                    theme={theme}
                                    featured={plan.featured}
                                    onClick={() => handleSubscription(plan)}
                                >
                                    Subscribe Now
                                </SubscribeButton>
                            </SubscriptionCard>
                        ))}
                    </SubscriptionGrid>
                </Section>
            </ProfileCard>
        </Container>
    );
}