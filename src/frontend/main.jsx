// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import App from './src/App';
import './index.css';
import { Provider } from 'react-redux';
import store from './src/slices/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
      
      <App/>
    </Provider> 
  </StrictMode>
);
