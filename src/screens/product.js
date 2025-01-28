import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaShoppingCart, FaHeart, FaShare, FaStar, FaTruck, FaShieldAlt, 
         FaUndo, FaTag, FaCreditCard, FaBoxOpen, FaFilter, FaSort,
         FaSearch, FaEye, FaTimes } from 'react-icons/fa';
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

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scaleIn = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
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
  padding: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    padding: 0.5rem;
  }
`;

const ProductCard = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImage = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  background: ${props => props.theme.background};
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .price {
    color: ${props => props.theme.primary};
    font-weight: bold;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0.5rem 0;
  }

  .original-price {
    color: ${props => props.theme.text}60;
    text-decoration: line-through;
    font-size: 1rem;
  }

  .discount {
    background: ${props => props.theme.primary}20;
    color: ${props => props.theme.primary};
    padding: 0.25rem 0.5rem;
    border-radius: 5px;
    font-size: 0.8rem;
    font-weight: bold;
  }

  .description {
    color: ${props => props.theme.text}99;
    font-size: 0.9rem;
    margin: 0.5rem 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0.5rem 0;

    span {
      color: ${props => props.theme.text};
      font-weight: 500;
    }

    .reviews {
      color: ${props => props.theme.text}80;
      font-size: 0.9rem;
    }
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  animation: ${fadeIn} 0.3s ease forwards;
`;

const ModalContent = styled.div`
  background: ${props => props.theme.cardBg};
  padding: 2rem;
  border-radius: 15px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  opacity: 0;
  animation: ${scaleIn} 0.3s ease forwards;
  animation-delay: 0.1s;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${props => props.theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.text}20;
  }
`;

const CategoryBar = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem 0;
  margin: 1rem 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryChip = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background: ${props => props.active ? props.theme.primary : props.theme.cardBg};
  color: ${props => props.active ? 'white' : props.theme.text};
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.theme.cardBg};
  border-radius: 10px;
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  input {
    flex: 1;
    border: none;
    background: none;
    color: ${props => props.theme.text};
    padding: 0.5rem;
    font-size: 1rem;
    outline: none;

    &::placeholder {
      color: ${props => props.theme.text}60;
    }
  }

  svg {
    color: ${props => props.theme.text}60;
    margin-right: 0.5rem;
  }
`;

const QuickViewButton = styled(ActionButton)`
  background: ${props => props.theme.cardBg};
  color: ${props => props.theme.text};
  border: 2px solid ${props => props.theme.primary};
  margin-top: 0.5rem;

  &:hover {
    background: ${props => props.theme.primary}20;
  }
`;

const LoadingSpinner = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.primary};
  font-size: 1.2rem;
  animation: ${pulse} 2s infinite;
`;

export default function Product() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [wishlistedItems, setWishlistedItems] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const categories = [
    'All',
    'Headphones',
    'Gaming',
    'Wireless',
    'Professional',
    'Budget',
    'Premium'
  ];

  const products = [
    {
      id: 1,
      name: "Apple AirPods Pro",
      price: 249.99,
      originalPrice: 279.99,
      discount: 11,
      rating: 4.8,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Apple+AirPods+Pro"
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
    },
    {
      id: 7,
      name: "Sony WH-1000XM5",
      price: 349.99,
      originalPrice: 399.99,
      discount: 13,
      rating: 4.8,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Sony+WH-1000XM5"
    },
    {
      id: 8,
      name: "Bose QuietComfort 45",
      price: 299.99,
      originalPrice: 349.99,
      discount: 14,
      rating: 4.7,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Bose+QuietComfort+45"
    },
    {
      id: 9,
      name: "Sennheiser HD 400 Pro",
      price: 199.99,
      originalPrice: 249.99,
      discount: 20,
      rating: 4.6,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Sennheiser+HD+400+Pro"
    },
    {
      id: 10,
      name: "Audio-Technica ATH-M50x",
      price: 169.99,
      originalPrice: 199.99,
      discount: 15,
      rating: 4.8,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Audio-Technica+ATH-M50x"
    },
    {
      id: 11,
      name: "Beats Solo Pro",
      price: 299.99,
      originalPrice: 349.99,
      discount: 14,
      rating: 4.7,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Beats+Solo+Pro"
    },
    {
      id: 12,
      name: "Jabra Elite 85t",
      price: 199.99,
      originalPrice: 249.99,
      discount: 20,
      rating: 4.6,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Jabra+Elite+85t"
    },
    {
      id: 13,
      name: "Anker Soundcore Space Q45",
      price: 99.99,
      originalPrice: 129.99,
      discount: 23,
      rating: 4.8,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Anker+Soundcore+Space+Q45"
    },
    {
      id: 14,
      name: "Edifier H840",
      price: 49.99,
      originalPrice: 69.99,
      discount: 29,
      rating: 4.7,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Edifier+H840"
    },
    {
      id: 15,
      name: "HyperX Cloud II",
      price: 99.99,
      originalPrice: 129.99,
      discount: 23,
      rating: 4.8,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=HyperX+Cloud+II"
    },
    {
      id: 16,
      name: "SteelSeries Arctis 7",
      price: 149.99,
      originalPrice: 179.99,
      discount: 17,
      rating: 4.7,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=SteelSeries+Arctis+7"
    },
    {
      id: 17,
      name: "Turtle Beach Recon 200",
      price: 59.99,
      originalPrice: 79.99,
      discount: 25,
      rating: 4.6,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Turtle+Beach+Recon+200"
    },
    {
      id: 18,
      name: "Corsair HS70 Wireless",
      price: 99.99,
      originalPrice: 129.99,
      discount: 23,
      rating: 4.8,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Corsair+HS70+Wireless"
    },
    {
      id: 19,
      name: "Logitech G Pro X",
      price: 69.99,
      originalPrice: 89.99,
      discount: 22,
      rating: 4.7,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Logitech+G+Pro+X"
    },
    {
      id: 20,
      name: "Razer Kraken X",
      price: 79.99,
      originalPrice: 99.99,
      discount: 20,
      rating: 4.6,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Razer+Kraken+X"
    },
    {
      id: 21,
      name: "Sennheiser GSP 670",
      price: 349.99,
      originalPrice: 399.99,
      discount: 13,
      rating: 4.8,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Sennheiser+GSP+670"
    },
    {
      id: 22,
      name: "Audio-Technica ATH-G1",
      price: 169.99,
      originalPrice: 199.99,
      discount: 15,
      rating: 4.7,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Audio-Technica+ATH-G1"
    },
    {
      id: 23,
      name: "HyperX Cloud Alpha",
      price: 99.99,
      originalPrice: 129.99,
      discount: 23,
      rating: 4.8,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=HyperX+Cloud+Alpha"
    },
    {
      id: 24,
      name: "SteelSeries Arctis 5",
      price: 149.99,
      originalPrice: 179.99,
      discount: 17,
      rating: 4.7,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=SteelSeries+Arctis+5"
    },
    {
      id: 25,
      name: "Turtle Beach Recon 70",
      price: 49.99,
      originalPrice: 69.99,
      discount: 29,
      rating: 4.6,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Turtle+Beach+Recon+70"
    },
    {
      id: 26,
      name: "Corsair HS60 Haptic",
      price: 99.99,
      originalPrice: 129.99,
      discount: 23,
      rating: 4.8,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Corsair+HS60+Haptic"
    },
    {
      id: 27,
      name: "Logitech G533",
      price: 149.99,
      originalPrice: 179.99,
      discount: 17,
      rating: 4.7,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Logitech+G533"
    },
    {
      id: 28,
      name: "Razer Opus 7",
      price: 199.99,
      originalPrice: 249.99,
      discount: 20,
      rating: 4.6,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Razer+Opus+7"
    },
    {
      id: 29,
      name: "Sennheiser HD 4.50 BT",
      price: 199.99,
      originalPrice: 249.99,
      discount: 20,
      rating: 4.7,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Sennheiser+HD+4.50+BT"
    },
    {
      id: 30,
      name: "Audio-Technica ATH-M50xBT",
      price: 169.99,
      originalPrice: 199.99,
      discount: 15,
      rating: 4.8,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Audio-Technica+ATH-M50xBT"
    },
    {
      id: 31,
      name: "Beats Solo Pro",
      price: 299.99,
      originalPrice: 349.99,
      discount: 14,
      rating: 4.7,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Beats+Solo+Pro"
    },
    {
      id: 32,
      name: "Jabra Elite 85h",
      price: 299.99,
      originalPrice: 349.99,
      discount: 14,
      rating: 4.6,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Jabra+Elite+85h"
    },
    {
      id: 33,
      name: "Anker Soundcore Space Q32",
      price: 99.99,
      originalPrice: 129.99,
      discount: 23,
      rating: 4.8,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Anker+Soundcore+Space+Q32"
    },
    {
      id: 34,
      name: "Edifier H840",
      price: 49.99,
      originalPrice: 69.99,
      discount: 29,
      rating: 4.7,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Edifier+H840"
    },
    {
      id: 35,
      name: "HyperX Cloud II",
      price: 99.99,
      originalPrice: 129.99,
      discount: 23,
      rating: 4.8,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=HyperX+Cloud+II"
    },
    {
      id: 36,
      name: "SteelSeries Arctis 7",
      price: 149.99,
      originalPrice: 179.99,
      discount: 17,
      rating: 4.7,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=SteelSeries+Arctis+7"
    },
    {
      id: 37,
      name: "Turtle Beach Recon 200",
      price: 59.99,
      originalPrice: 79.99,
      discount: 25,
      rating: 4.6,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Turtle+Beach+Recon+200"
    },
    {
      id: 38,
      name: "Corsair HS70 Wireless",
      price: 99.99,
      originalPrice: 129.99,
      discount: 23,
      rating: 4.8,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Corsair+HS70+Wireless"
    },
    {
      id: 39,
      name: "Logitech G Pro X",
      price: 69.99,
      originalPrice: 89.99,
      discount: 22,
      rating: 4.7,
      reviews: 1203,
      image: "https://via.placeholder.com/300?text=Logitech+G+Pro+X"
    },
    {
      id: 40,
      name: "Anker Soundcore Motion+",
      price: 99.99,
      originalPrice: 129.99,
      discount: 23,
      rating: 4.8,
      reviews: 614,
      image: "https://via.placeholder.com/300?text=Anker+Soundcore+Motion+Plus"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.name.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

      <SearchBar theme={theme}>
        <FaSearch />
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchBar>

      <CategoryBar>
        {categories.map(category => (
          <CategoryChip
            key={category}
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
            theme={theme}
          >
            {category}
          </CategoryChip>
        ))}
      </CategoryBar>

      <ProductGrid>
        {loading ? (
          <LoadingSpinner theme={theme}>Loading products...</LoadingSpinner>
        ) : (
          filteredProducts.map((product) => (
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
                <QuickViewButton theme={theme} onClick={() => setQuickViewProduct(product)}>
                  <FaEye /> Quick View
                </QuickViewButton>
              </ProductInfo>
            </ProductCard>
          ))
        )}
      </ProductGrid>

      {quickViewProduct && (
        <Modal onClick={() => setQuickViewProduct(null)}>
          <ModalContent theme={theme} onClick={e => e.stopPropagation()}>
            <CloseButton theme={theme} onClick={() => setQuickViewProduct(null)}>
              <FaTimes />
            </CloseButton>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div style={{ flex: '0 0 40%' }}>
                <img 
                  src={quickViewProduct.image} 
                  alt={quickViewProduct.name} 
                  style={{ width: '100%', borderRadius: '10px' }}
                />
              </div>
              <div style={{ flex: '1' }}>
                <h2>{quickViewProduct.name}</h2>
                <Rating>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} color={i < Math.floor(quickViewProduct.rating) ? theme.primary : theme.text + '20'} />
                  ))}
                  <span className="count">({quickViewProduct.reviews} reviews)</span>
                </Rating>
                <div style={{ margin: '1rem 0' }}>
                  <span className="price" style={{ fontSize: '2rem' }}>${quickViewProduct.price}</span>
                  <span className="original-price" style={{ marginLeft: '1rem' }}>${quickViewProduct.originalPrice}</span>
                  <span className="discount" style={{ marginLeft: '1rem' }}>{quickViewProduct.discount}% OFF</span>
                </div>
                <p style={{ color: theme.text + '99', marginBottom: '2rem' }}>
                  Experience premium audio quality with this exceptional product. Features advanced noise cancellation,
                  comfortable design, and long battery life for an immersive listening experience.
                </p>
                <ActionButton theme={theme} style={{ width: 'auto', marginRight: '1rem' }}>
                  <FaShoppingCart /> Add to Cart
                </ActionButton>
                <WishlistButton 
                  onClick={() => toggleWishlist(quickViewProduct.id)} 
                  theme={theme}
                  style={{ position: 'static', width: 'auto', padding: '0.75rem' }}
                >
                  <FaHeart color={wishlistedItems.has(quickViewProduct.id) ? theme.primary : theme.text + '80'} />
                </WishlistButton>
              </div>
            </div>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}