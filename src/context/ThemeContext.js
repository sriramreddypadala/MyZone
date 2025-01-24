import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
    light: {
        primary: '#4299e1',
        secondary: '#48bb78',
        background: 'linear-gradient(145deg, #f0f3f9 0%, #dde4ec 100%)',
        text: '#2d3748',
        cardBg: 'white',
        headerBg: 'rgba(255, 255, 255, 0.9)',
        toggleButton: {
            color: '#4299e1',
            hoverColor: '#2b6cb0',
            rippleColor: 'rgba(66, 153, 225, 0.2)',
            activeColor: '#48bb78',
            background: 'white',
            shadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
        }
    },
    dark: {
        primary: '#63b3ed',
        secondary: '#68d391',
        background: 'linear-gradient(145deg, #1a202c 0%, #2d3748 100%)',
        text: '#f7fafc',
        cardBg: '#2d3748',
        headerBg: 'rgba(26, 32, 44, 0.9)',
        toggleButton: {
            color: '#63b3ed',
            hoverColor: '#90cdf4',
            rippleColor: 'rgba(99, 179, 237, 0.2)',
            activeColor: '#68d391',
            background: '#2d3748',
            shadow: '0 2px 5px rgba(0, 0, 0, 0.3)'
        }
    },
    ocean: {
        primary: '#4fd1c5',
        secondary: '#38b2ac',
        background: 'linear-gradient(145deg, #ebf8ff 0%, #bee3f8 100%)',
        text: '#2c5282',
        cardBg: '#ebf8ff',
        headerBg: 'rgba(235, 248, 255, 0.9)',
        toggleButton: {
            color: '#4fd1c5',
            hoverColor: '#38b2ac',
            rippleColor: 'rgba(79, 209, 197, 0.2)',
            activeColor: '#38b2ac',
            background: '#ebf8ff',
            shadow: '0 2px 5px rgba(44, 82, 130, 0.1)'
        }
    },
    sunset: {
        primary: '#ed8936',
        secondary: '#dd6b20',
        background: 'linear-gradient(145deg, #fffaf0 0%, #feebc8 100%)',
        text: '#744210',
        cardBg: '#fffaf0',
        headerBg: 'rgba(255, 250, 240, 0.9)',
        toggleButton: {
            color: '#ed8936',
            hoverColor: '#dd6b20',
            rippleColor: 'rgba(237, 137, 54, 0.2)',
            activeColor: '#dd6b20',
            background: '#fffaf0',
            shadow: '0 2px 5px rgba(116, 66, 16, 0.1)'
        }
    }
};

export function ThemeProvider({ children }) {
    const [currentTheme, setCurrentTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    });

    useEffect(() => {
        localStorage.setItem('theme', currentTheme);
    }, [currentTheme]);

    const value = {
        theme: themes[currentTheme],
        currentTheme,
        setCurrentTheme
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
