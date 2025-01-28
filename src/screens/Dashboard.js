import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaShoppingCart, FaBox, FaTruck, FaShoppingBag, FaStore, FaChartLine, 
         FaUsers, FaMoneyBillWave, FaSearch, FaBell, FaUserCircle, FaSignOutAlt, 
         FaBoxOpen, FaBars, FaTimes, FaEye, FaPlus, FaStar, FaMinus, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg) scale(1); }
  50% { transform: translateY(-20px) rotate(5deg) scale(1.1); }
  100% { transform: translateY(0px) rotate(0deg) scale(1); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 0.5; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const ripple = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  80% {
    transform: scale(1.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
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
  position: relative;
  z-index: 1000;

  h1 {
    color: ${props => props.theme.text};
    margin: 0;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    
    h1 {
      font-size: 1.5rem;
    }
  }
`;

const NavToggleButton = styled.button`
  display: none;
  background: ${props => props.theme.toggleButton.background};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: ${props => props.theme.toggleButton.shadow};
  z-index: 1000;
  overflow: hidden;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
      font-size: 1.25rem;
      color: ${props => props.isOpen ? 
        props.theme.toggleButton.activeColor : 
        props.theme.toggleButton.color};
      transition: all 0.3s ease;
      transform: ${props => props.isOpen ? 'rotate(90deg)' : 'rotate(0deg)'};
      position: relative;
      z-index: 2;
    }

    &:hover {
      box-shadow: ${props => props.theme.toggleButton.shadow}, 
                 0 4px 10px rgba(0, 0, 0, 0.1);
      
      svg {
        color: ${props => props.theme.toggleButton.hoverColor};
      }
    }

    &:active {
      transform: scale(0.95);
    }

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      background: ${props => props.theme.toggleButton.rippleColor};
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.3s ease;
    }

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      background: ${props => props.theme.toggleButton.rippleColor};
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      animation: ${ripple} 1s ease-out infinite;
      animation-play-state: ${props => props.isOpen ? 'running' : 'paused'};
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px ${props => props.theme.toggleButton.rippleColor},
                 ${props => props.theme.toggleButton.shadow};
    }

    &:focus:not(:focus-visible) {
      box-shadow: ${props => props.theme.toggleButton.shadow};
    }
  }
`;

const MobileNav = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: ${props => props.theme.cardBg}F5;
    backdrop-filter: blur(10px);
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    transition: transform 0.3s ease-in-out;
    z-index: 999;
    padding: 5rem 2rem 2rem;

    nav {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
`;

const MobileNavItem = styled.button`
  background: ${props => props.theme.background}80;
  border: none;
  border-radius: 10px;
  padding: 1rem;
  color: ${props => props.theme.text};
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    color: ${props => props.theme.primary};
    font-size: 1.2rem;
  }

  &:hover {
    background: ${props => props.theme.primary}20;
    transform: translateX(10px);
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.theme.background};
  border-radius: 8px;
  padding: 0.5rem 1rem;
  margin: 0 2rem;
  flex: 1;
  max-width: 400px;

  svg {
    color: ${props => props.theme.text}80;
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  margin-left: 0.5rem;
  color: ${props => props.theme.text};
  width: 100%;
  
  &::placeholder {
    color: ${props => props.theme.text}60;
  }

  &:focus {
    outline: none;
  }
`;

const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.text}99;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${props => props.theme.primary};
    transform: translateY(-2px);
  }

  ${props => props.hasNotification && `
    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 8px;
      height: 8px;
      background: ${props.theme.primary};
      border-radius: 50%;
    }
  `}

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.4rem;

    &:not(.essential) {
      display: none;
    }
  }
`;

const CartIconWrapper = styled(IconButton)`
  &:hover {
    animation: ${pulse} 1s infinite;
  }

  .cart-count {
    position: absolute;
    top: -5px;
    right: -5px;
    background: ${props => props.theme.primary};
    color: white;
    font-size: 0.7rem;
    padding: 2px 6px;
    border-radius: 10px;
    font-weight: bold;
  }
`;

const MobileSearchButton = styled(IconButton)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileSearchOverlay = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: ${props => props.theme.headerBg};
    z-index: 1001;
    animation: slideDown 0.3s ease-out;

    @keyframes slideDown {
      from { transform: translateY(-100%); }
      to { transform: translateY(0); }
    }
  }
`;

const MobileSearchInput = styled.input`
  flex: 1;
  background: ${props => props.theme.background};
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  color: ${props => props.theme.text};
  margin: 0 0.5rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.primary};
  }
`;

const MainContent = styled.main`
  padding: 2rem;
  display: grid;
  gap: 2rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: ${props => props.theme.cardBg};
  padding: 1.5rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
  }
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const StatInfo = styled.div`
  h3 {
    font-size: 1.5rem;
    margin: 0;
    color: ${props => props.theme.text};
  }
  p {
    margin: 0;
    color: ${props => props.theme.text}80;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
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

    .product-actions {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ProductImage = styled.div`
  position: relative;
  height: 200px;
  background: ${props => props.theme.cardBg};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
  
  h3 {
    color: ${props => props.theme.text};
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    color: ${props => props.theme.text}80;
    margin: 0;
    font-size: 0.9rem;
  }

  .price {
    color: ${props => props.theme.primary};
    font-weight: bold;
    margin-top: 0.5rem;
    font-size: 1.3rem;
  }
`;

const ProductActions = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: ${props => props.theme.cardBg}F5;
  backdrop-filter: blur(5px);
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transform: translateY(100%);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    opacity: 1;
    transform: translateY(0);
    position: relative;
    padding: 1rem;
  }
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.primary ? props.theme.primary : props.theme.cardBg};
  color: ${props => props.primary ? 'white' : props.theme.text};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  ${props => props.added && css`
    background: ${props.theme.primary}20;
    color: ${props.theme.primary};
  `}

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background: ${props => props.added 
      ? props.theme.primary + '30'
      : props.primary 
        ? props.theme.primary + 'DD' 
        : props.theme.cardBg + 'DD'};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  svg {
    font-size: 1.1rem;
  }

  .success-animation {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${scaleIn} 0.3s ease forwards;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;

  button {
    background: ${props => props.theme.cardBg};
    border: none;
    border-radius: 5px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${props => props.theme.text};
    transition: all 0.3s ease;

    &:hover {
      background: ${props => props.theme.primary}20;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  span {
    min-width: 30px;
    text-align: center;
    font-weight: 600;
  }
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

  @media (max-width: 768px) {
    padding: 1rem;
    width: 95%;
  }
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

const FloatingIcon = styled.div`
  position: absolute;
  color: ${props => props.theme.text}40;
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

export default function Dashboard() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addingToCart, setAddingToCart] = useState({});
  
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    getCartCount 
  } = useCart();

  const handleAddToCart = async (product) => {
    setAddingToCart(prev => ({ ...prev, [product.id]: true }));

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      addToCart(product);
      // Show success state briefly
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setAddingToCart(prev => ({ ...prev, [product.id]: false }));
    }
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const getCartQuantity = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const navItems = [
    { icon: FaStore, label: 'Dashboard', onClick: () => navigate('/') },
    { icon: FaBox, label: 'Products', onClick: () => navigate('/products') },
    { icon: FaShoppingCart, label: 'Cart', onClick: () => navigate('/cart') },
    { icon: FaShoppingBag, label: 'My Orders', onClick: () => navigate('/confirmed-orders') },
    { icon: FaUserCircle, label: 'Profile', onClick: () => navigate('/profile') },
    { icon: FaSignOutAlt, label: 'Logout', onClick: () => {
      localStorage.removeItem("token");
      navigate('/');
      window.location.reload();
    } }
  ];

  const stats = [
    { icon: FaShoppingCart, title: "Total Orders", value: "1,234", color: theme.primary },
    { icon: FaUsers, title: "Active Users", value: "45.2K", color: theme.primary },
    { icon: FaMoneyBillWave, title: "Revenue", value: "$89.4K", color: theme.primary },
    { icon: FaBox, title: "Products", value: "892", color: theme.primary }
  ];

  const products = [
    { 
      id: 1,
      name: "Wireless Headphones", 
      price: 129.99, 
      sales: "234 sales",
      image: "https://via.placeholder.com/300?text=Wireless+Headphones",
      description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
      rating: 4.5,
      reviews: 128
    },
    { 
      id: 2,
      name: "Smart Watch", 
      price: 199.99, 
      sales: "186 sales",
      image: "https://via.placeholder.com/300?text=Smart+Watch",
      description: "Feature-rich smartwatch with health tracking and notifications.",
      rating: 4.3,
      reviews: 95
    },
    { 
      id: 3,
      name: "Laptop Pro", 
      price: 1299.99, 
      sales: "98 sales",
      image: "https://via.placeholder.com/300?text=Laptop+Pro",
      description: "Powerful laptop for professionals with high performance and long battery life.",
      rating: 4.8,
      reviews: 234
    },
    { 
      id: 4,
      name: "Gaming Console", 
      price: 499.99, 
      sales: "156 sales",
      image: "https://via.placeholder.com/300?text=Gaming+Console",
      description: "Next-gen gaming console with 4K graphics and fast loading times.",
      rating: 4.7,
      reviews: 189
    }
  ];

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

      <Header theme={theme}>
        <h1>Dashboard</h1>
        <NavToggleButton 
          theme={theme} 
          onClick={() => setIsNavOpen(!isNavOpen)}
          isOpen={isNavOpen}
          aria-label="Toggle navigation menu"
          aria-expanded={isNavOpen}
        >
          {isNavOpen ? <FaTimes /> : <FaBars />}
        </NavToggleButton>
        
        <SearchBar theme={theme}>
          <FaSearch />
          <SearchInput placeholder="Search..." theme={theme} />
        </SearchBar>

        <HeaderIcons>
          <MobileSearchButton 
            theme={theme} 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="essential"
          >
            <FaSearch />
          </MobileSearchButton>
          
          <CartIconWrapper 
            theme={theme} 
            onClick={() => navigate('/cart')}
            className="essential"
          >
            <FaShoppingCart />
            {getCartCount() > 0 && <span className="cart-count">{getCartCount()}</span>}
          </CartIconWrapper>

          <IconButton 
            theme={theme} 
            onClick={() => navigate('/confirmed-orders')}
            className="essential"
          >
            <FaShoppingBag />
          </IconButton>

          <IconButton theme={theme} hasNotification>
            <FaBell />
          </IconButton>

          <IconButton 
            theme={theme} 
            onClick={() => navigate('/profile')}
            className="essential"
          >
            <FaUserCircle />
          </IconButton>

          <IconButton theme={theme} onClick={() => {
            localStorage.removeItem("token");
            navigate('/');
            window.location.reload();
          }}>
            <FaSignOutAlt />
          </IconButton>
        </HeaderIcons>
      </Header>

      {/* Mobile Search Overlay */}
      <MobileSearchOverlay theme={theme} isOpen={isSearchOpen}>
        <IconButton theme={theme} onClick={() => setIsSearchOpen(false)}>
          <FaTimes />
        </IconButton>
        <MobileSearchInput 
          theme={theme} 
          placeholder="Search..."
          autoFocus
        />
        <IconButton theme={theme}>
          <FaSearch />
        </IconButton>
      </MobileSearchOverlay>

      {/* Mobile Navigation Menu */}
      <MobileNav theme={theme} isOpen={isNavOpen}>
        <nav>
          {navItems.map((item, index) => (
            <MobileNavItem
              key={index}
              theme={theme}
              onClick={() => {
                item.onClick();
                setIsNavOpen(false);
              }}
            >
              <item.icon />
              {item.label}
            </MobileNavItem>
          ))}
        </nav>
      </MobileNav>

      {/* Main Content */}
      <MainContent>
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index} theme={theme}>
              <StatIcon color={stat.color}>
                <stat.icon />
              </StatIcon>
              <StatInfo theme={theme}>
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
              </StatInfo>
            </StatCard>
          ))}
        </StatsGrid>

        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id} theme={theme}>
              <ProductImage onClick={() => setSelectedProduct(product)}>
                <img src={product.image} alt={product.name} />
              </ProductImage>
              <ProductInfo theme={theme}>
                <h3>{product.name}</h3>
                <p>{product.sales}</p>
                <div className="price">${product.price}</div>
                {getCartQuantity(product.id) > 0 && (
                  <QuantityControl theme={theme}>
                    <button onClick={() => handleUpdateQuantity(product.id, getCartQuantity(product.id) - 1)}>
                      <FaMinus />
                    </button>
                    <span>{getCartQuantity(product.id)}</span>
                    <button onClick={() => handleAddToCart(product)}>
                      <FaPlus />
                    </button>
                  </QuantityControl>
                )}
              </ProductInfo>
              <ProductActions className="product-actions" theme={theme}>
                <ActionButton 
                  theme={theme} 
                  onClick={() => handleAddToCart(product)}
                  primary
                  disabled={addingToCart[product.id]}
                  added={getCartQuantity(product.id) > 0}
                >
                  {addingToCart[product.id] ? (
                    <div className="success-animation">
                      <FaCheck />
                    </div>
                  ) : getCartQuantity(product.id) > 0 ? (
                    <>
                      <FaShoppingCart /> In Cart ({getCartQuantity(product.id)})
                    </>
                  ) : (
                    <>
                      <FaPlus /> Add to Cart
                    </>
                  )}
                </ActionButton>
                <ActionButton 
                  theme={theme}
                  onClick={() => setSelectedProduct(product)}
                >
                  <FaEye /> View
                </ActionButton>
              </ProductActions>
            </ProductCard>
          ))}
        </ProductGrid>
      </MainContent>

      {selectedProduct && (
        <Modal onClick={() => setSelectedProduct(null)}>
          <ModalContent theme={theme} onClick={e => e.stopPropagation()}>
            <CloseButton theme={theme} onClick={() => setSelectedProduct(null)}>
              <FaTimes />
            </CloseButton>
            <div style={{ 
              display: 'flex', 
              gap: '2rem',
              flexDirection: window.innerWidth <= 768 ? 'column' : 'row'
            }}>
              <div style={{ flex: '0 0 40%', minWidth: window.innerWidth <= 768 ? '100%' : '300px' }}>
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  style={{ width: '100%', borderRadius: '10px' }}
                />
              </div>
              <div style={{ flex: '1' }}>
                <h2 style={{ marginTop: 0 }}>{selectedProduct.name}</h2>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  color: theme.text + '80'
                }}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      color={i < Math.floor(selectedProduct.rating) ? theme.primary : theme.text + '20'} 
                    />
                  ))}
                  <span>({selectedProduct.reviews} reviews)</span>
                </div>
                <p style={{ 
                  color: theme.text + '99',
                  margin: '1rem 0',
                  lineHeight: '1.6'
                }}>
                  {selectedProduct.description}
                </p>
                <div style={{ 
                  fontSize: '2rem', 
                  color: theme.primary,
                  fontWeight: 'bold',
                  margin: '1rem 0'
                }}>
                  ${selectedProduct.price}
                </div>
                <p style={{ color: theme.text + '80' }}>{selectedProduct.sales}</p>
                {getCartQuantity(selectedProduct.id) > 0 && (
                  <QuantityControl theme={theme}>
                    <button onClick={() => handleUpdateQuantity(selectedProduct.id, getCartQuantity(selectedProduct.id) - 1)}>
                      <FaMinus />
                    </button>
                    <span>{getCartQuantity(selectedProduct.id)}</span>
                    <button onClick={() => handleAddToCart(selectedProduct)}>
                      <FaPlus />
                    </button>
                  </QuantityControl>
                )}
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem',
                  marginTop: '2rem',
                  flexWrap: 'wrap'
                }}>
                  <ActionButton 
                    theme={theme} 
                    primary 
                    onClick={() => handleAddToCart(selectedProduct)}
                    disabled={addingToCart[selectedProduct.id]}
                    added={getCartQuantity(selectedProduct.id) > 0}
                    style={{ flex: '1', minWidth: '150px' }}
                  >
                    {addingToCart[selectedProduct.id] ? (
                      <div className="success-animation">
                        <FaCheck />
                      </div>
                    ) : getCartQuantity(selectedProduct.id) > 0 ? (
                      <>
                        <FaShoppingCart /> In Cart ({getCartQuantity(selectedProduct.id)})
                      </>
                    ) : (
                      <>
                        <FaPlus /> Add to Cart
                      </>
                    )}
                  </ActionButton>
                  <ActionButton 
                    theme={theme}
                    onClick={() => navigate('/cart')}
                    style={{ flex: '1', minWidth: '150px' }}
                  >
                    <FaShoppingCart /> View Cart
                  </ActionButton>
                </div>
              </div>
            </div>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}