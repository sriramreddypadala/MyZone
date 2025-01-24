import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaShoppingCart, FaHeart, FaShare, FaStar, FaTruck, FaShieldAlt, 
         FaUndo, FaTag, FaCreditCard, FaBoxOpen, FaFilter, FaSort } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg) scale(1); }
  50% { transform: translateY(-20px) rotate(5deg) scale(1.1); }
  100% { transform: translateY(0px) rotate(0deg) scale(1); }
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
  position: relative;
  overflow: hidden;
  padding: 2rem;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${props => props.theme.headerBg};
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    color: ${props => props.theme.text};
    margin: 0;
    font-size: 1.8rem;
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 1rem 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.theme.cardBg};
  color: ${props => props.theme.text};
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  svg {
    color: ${props => props.theme.primary};
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.theme.cardBg};
  color: ${props => props.theme.text};
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
`;

const ProductCard = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  background: #f0f2f5;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${props => props.theme.cardBg};
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  padding: 1.5rem;

  h3 {
    color: ${props => props.theme.text};
    margin: 0;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .price {
    color: ${props => props.theme.primary};
    font-weight: bold;
    font-size: 1.5rem;
  }

  .original-price {
    color: ${props => props.theme.text}60;
    text-decoration: line-through;
    font-size: 1rem;
    margin-left: 0.5rem;
  }

  .discount {
    background: ${props => props.theme.primary};
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 5px;
    font-size: 0.8rem;
    margin-left: 0.5rem;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0.5rem 0;

  svg {
    color: ${props => props.theme.primary};
  }

  .count {
    color: ${props => props.theme.text}60;
    font-size: 0.9rem;
    margin-left: 0.5rem;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.theme.primary};
  color: white;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.primary}80;
    transform: translateY(-2px);
  }
`;

const FloatingIcon = styled.div`
  position: absolute;
  color: ${props => props.theme.primary};
  font-size: ${props => props.size || '2rem'};
  animation: ${float} ${props => props.duration || '3s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  left: ${props => props.left};
  top: ${props => props.top};
  z-index: 0;

  @media (max-width: 768px) {
    font-size: calc(${props => props.size || '2rem'} * 0.8);
  }
`;

const PulsingCircle = styled.div`
  position: absolute;
  width: ${props => props.size || '100px'};
  height: ${props => props.size || '100px'};
  border-radius: 50%;
  background: ${props => props.color || 'rgba(66, 153, 225, 0.1)'};
  animation: ${pulse} ${props => props.duration || '3s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  left: ${props => props.left};
  top: ${props => props.top};
  z-index: 0;
`;

export default function Product() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [wishlistedItems, setWishlistedItems] = useState(new Set());

  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      originalPrice: 399.99,
      discount: 25,
      rating: 4.8,
      reviews: 128,
      image: "https://via.placeholder.com/300?text=Headphones"
    },
    {
      id: 2,
      name: "Smart 4K Ultra HD TV",
      price: 899.99,
      originalPrice: 1199.99,
      discount: 25,
      rating: 4.9,
      reviews: 256,
      image: "https://via.placeholder.com/300?text=TV"
    },
    {
      id: 3,
      name: "Professional DSLR Camera",
      price: 1299.99,
      originalPrice: 1499.99,
      discount: 13,
      rating: 4.7,
      reviews: 89,
      image: "https://via.placeholder.com/300?text=Camera"
    },
    {
      id: 4,
      name: "Gaming Laptop Pro",
      price: 1899.99,
      originalPrice: 2199.99,
      discount: 14,
      rating: 4.9,
      reviews: 167,
      image: "https://via.placeholder.com/300?text=Laptop"
    },
    {
      id: 5,
      name: "Smartwatch Series 5",
      price: 399.99,
      originalPrice: 499.99,
      discount: 20,
      rating: 4.6,
      reviews: 203,
      image: "https://via.placeholder.com/300?text=Smartwatch"
    },
    {
      id: 6,
      name: "Wireless Gaming Mouse",
      price: 79.99,
      originalPrice: 99.99,
      discount: 20,
      rating: 4.5,
      reviews: 145,
      image: "https://via.placeholder.com/300?text=Mouse"
    }
  ];

  const toggleWishlist = (productId) => {
    setWishlistedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  return (
    <Container theme={theme}>
      {/* Background Animations */}
      <FloatingIcon as={FaTag} size="4rem" left="5%" top="20%" duration="4s" theme={theme} />
      <FloatingIcon as={FaBoxOpen} size="3.5rem" left="85%" top="15%" duration="5s" delay="0.5s" theme={theme} />
      <FloatingIcon as={FaCreditCard} size="3rem" left="15%" top="60%" duration="4.5s" delay="1s" theme={theme} />
      <FloatingIcon as={FaTruck} size="3.5rem" left="75%" top="70%" duration="4s" delay="1.5s" theme={theme} />
      
      <PulsingCircle size="200px" left="10%" top="30%" color="rgba(66, 153, 225, 0.1)" duration="4s" />
      <PulsingCircle size="150px" left="80%" top="60%" color="rgba(72, 187, 120, 0.1)" duration="5s" delay="1s" />
      <PulsingCircle size="180px" left="40%" top="80%" color="rgba(237, 137, 54, 0.1)" duration="4.5s" delay="2s" />

      <Header theme={theme}>
        <h1>Featured Products</h1>
        <FilterSection>
          <FilterButton theme={theme}>
            <FaFilter /> Filter
          </FilterButton>
          <FilterButton theme={theme}>
            <FaSort /> Sort
          </FilterButton>
        </FilterSection>
      </Header>

      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id} theme={theme}>
            <ProductImage>
              <img src={product.image} alt={product.name} />
              <WishlistButton onClick={() => toggleWishlist(product.id)} theme={theme}>
                <FaHeart color={wishlistedItems.has(product.id) ? theme.primary : theme.text + '80'} />
              </WishlistButton>
            </ProductImage>
            <ProductInfo theme={theme}>
              <h3>{product.name}</h3>
              <Rating>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color={i < Math.floor(product.rating) ? theme.primary : theme.text + '20'} />
                ))}
                <span className="count">({product.reviews})</span>
              </Rating>
              <div>
                <span className="price">${product.price}</span>
                <span className="original-price">${product.originalPrice}</span>
                <span className="discount">{product.discount}% OFF</span>
              </div>
              <ActionButton theme={theme}>
                <FaShoppingCart /> Add to Cart
              </ActionButton>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </Container>
  );
}