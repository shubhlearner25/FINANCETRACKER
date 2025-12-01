import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App.jsx';
import './index.css';

import { updateFavicon } from './utils/favicon';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { CurrencyProvider } from './contexts/CurrencyContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';

// Determine theme once on load
const detectInitialTheme = () => {
  const stored = localStorage.getItem('theme');

  if (stored) return stored;

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

// Set favicon before rendering
updateFavicon(detectInitialTheme());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <CurrencyProvider>
            <App />
          </CurrencyProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
