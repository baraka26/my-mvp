// src/index.js — Application Bootstrap (Omega Refined)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Global styles
import { UserProvider } from './context/UserContext.jsx';

// Create root element using React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

// Hydrate app with global providers & strict mode
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);