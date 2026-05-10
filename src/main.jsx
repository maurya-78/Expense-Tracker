import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// 1. Global Styles
import './styles/index.css';
import './styles/animations.css';

// 2. Core Components & Providers
import App from './App';
import { AppProvider } from './providers/AppProvider';

/**
 * Root mounting point for the Stellar Finance Platform.
 * StrictMode is enabled to catch side-effects during development.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);