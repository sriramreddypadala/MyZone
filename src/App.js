import logo from './logo.svg';
import './App.css';
import React from 'react';
import UrlRoutes from './UrlRoutes';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <UrlRoutes />
    </ThemeProvider>
  );
}

export default App;
