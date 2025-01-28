import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaShare, FaStar, FaTruck, FaShieldAlt, FaArrowLeft, 
         FaBox, FaRecycle, FaCreditCard, FaGift, FaCheck } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const shine = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 0.5; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const Container = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  padding: 1rem;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const AnimatedBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
`;

const FloatingIcon = styled.div`
  position: absolute;
  color: ${props => props.theme.text}20;
  animation: ${float} 6s ease-in-out infinite;
  font-size: ${props => props.size || '2rem'};
  left: ${props => props.left};
  top: ${props => props.top};
`;

const BackButton = styled.button`
  background: ${props => props.theme.cardBg};
  border: none;
  color: ${props => props.theme.text};
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  z-index: 1;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(-5px);
    background: ${props => props.theme.primary}20;
  }
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 1;
  background: ${props => props.theme.cardBg}80;
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 1.5rem;
  }
`;

const ImageSection = styled.div`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, ${props => props.theme.primary}20, transparent);
    pointer-events: none;
  }
  
  img {
    width: 100%;
    height: auto;
    border-radius: 15px;
    object-fit: cover;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  color: ${props => props.theme.text};
  background: linear-gradient(45deg, ${props => props.theme.primary}, ${props => props.theme.text});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.primary};
  display: flex;
  align-items: center;
  gap: 1rem;
  
  .original-price {
    font-size: 1.2rem;
    text-decoration: line-through;
    color: ${props => props.theme.textSecondary};
  }
  
  .discount {
    background: ${props => props.theme.primary}20;
    color: ${props => props.theme.primary};
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 1rem;
  }
`;

const Description = styled.div`
  line-height: 1.8;
  color: ${props => props.theme.textSecondary};
  
  .main-desc {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 0.8rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      &:before {
        content: '•';
        color: ${props => props.theme.primary};
        font-weight: bold;
      }
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const AddToCartButton = styled(Button)`
  background: ${props => props.added ? props.theme.success : props.theme.primary};
  color: white;
  flex: 2;
  
  &:hover {
    background: ${props => props.added ? props.theme.success + 'dd' : props.theme.primary + 'dd'};
  }
`;

const WishlistButton = styled(Button)`
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  border: 1px solid ${props => props.theme.border};
  flex: 1;
  
  &:hover {
    background: ${props => props.theme.border}20;
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${props => props.theme.border}40;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  background: ${props => props.theme.background}80;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: ${props => props.theme.primary}10;
  }
  
  .icon {
    font-size: 1.5rem;
    color: ${props => props.theme.primary};
  }
  
  .text {
    h4 {
      margin: 0;
      color: ${props => props.theme.text};
    }
    
    p {
      margin: 0;
      font-size: 0.9rem;
      color: ${props => props.theme.textSecondary};
    }
  }
`;

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { cart, addToCart, getCartCount } = useCart();
  const [product, setProduct] = useState(null);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    // Mock product data - replace with actual API call
    setProduct({
      id: id,
      name: "Premium Wireless Headphones",
      price: "$299.99",
      originalPrice: "$399.99",
      discount: "25% OFF",
      description: "Experience crystal-clear sound and ultimate comfort with our premium wireless headphones. Designed for audiophiles and music enthusiasts who demand the best in sound quality and comfort.",
      features: [
        "Active Noise Cancellation with adaptive sound control",
        "40mm liquid crystal polymer drivers for exceptional audio clarity",
        "Up to 30 hours of battery life with quick charging",
        "Premium memory foam ear cushions for extended comfort",
        "Touch controls for easy music and call management"
      ],
      image: "https://via.placeholder.com/500",
      rating: 4.8,
      reviews: 1250
    });
  }, [id]);

  useEffect(() => {
    if (product && cart) {
      setIsInCart(cart.some(item => item.id === product.id));
    }
  }, [cart, product]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success('Added to cart!');
    }
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  if (!product) {
    return <Container theme={theme}>Loading...</Container>;
  }

  return (
    <Container theme={theme}>
      <ToastContainer />
      <AnimatedBackground>
        <FloatingIcon as={FaBox} size="4rem" left="5%" top="10%" />
        <FloatingIcon as={FaGift} size="3rem" left="85%" top="15%" />
        <FloatingIcon as={FaShoppingCart} size="2.5rem" left="15%" top="75%" />
        <FloatingIcon as={FaHeart} size="2rem" left="80%" top="65%" />
      </AnimatedBackground>
      
      <BackButton onClick={handleBack} theme={theme}>
        <FaArrowLeft /> Back to Shopping
      </BackButton>
      
      <ProductContainer theme={theme}>
        <ImageSection theme={theme}>
          <img src={product.image} alt={product.name} />
        </ImageSection>
        
        <ProductDetails>
          <Title theme={theme}>{product.name}</Title>
          <Price theme={theme}>
            {product.price}
            <span className="original-price">{product.originalPrice}</span>
            <span className="discount">{product.discount}</span>
          </Price>
          
          <Description theme={theme}>
            <p className="main-desc">{product.description}</p>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </Description>
          
          <ActionButtons>
            <AddToCartButton 
              theme={theme} 
              added={isInCart}
              onClick={isInCart ? handleGoToCart : handleAddToCart}
            >
              {isInCart ? (
                <>
                  <FaCheck /> Go to Cart
                </>
              ) : (
                <>
                  <FaShoppingCart /> Add to Cart
                </>
              )}
            </AddToCartButton>
            <WishlistButton theme={theme}>
              <FaHeart /> Wishlist
            </WishlistButton>
          </ActionButtons>
          
          <Features theme={theme}>
            <FeatureItem theme={theme}>
              <div className="icon">
                <FaTruck />
              </div>
              <div className="text">
                <h4>Free Shipping</h4>
                <p>On orders over $50</p>
              </div>
            </FeatureItem>
            
            <FeatureItem theme={theme}>
              <div className="icon">
                <FaShieldAlt />
              </div>
              <div className="text">
                <h4>2 Year Warranty</h4>
                <p>Full coverage</p>
              </div>
            </FeatureItem>
            
            <FeatureItem theme={theme}>
              <div className="icon">
                <FaRecycle />
              </div>
              <div className="text">
                <h4>30-Day Returns</h4>
                <p>Money-back guarantee</p>
              </div>
            </FeatureItem>
            
            <FeatureItem theme={theme}>
              <div className="icon">
                <FaCreditCard />
              </div>
              <div className="text">
                <h4>Secure Payment</h4>
                <p>Protected checkout</p>
              </div>
            </FeatureItem>
          </Features>
        </ProductDetails>
      </ProductContainer>
    </Container>
  );
};

export default ProductView;