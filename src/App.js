import logo from './logo.svg';
import './App.css';
import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import UrlRoutes from './UrlRoutes';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <UrlRoutes />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
