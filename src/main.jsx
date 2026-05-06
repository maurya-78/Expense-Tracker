import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import './styles/globals.css';
import './styles/utilities.css';
import './styles/animations.css';

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);