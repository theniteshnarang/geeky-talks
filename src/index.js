import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StoreProvider } from './context/provider'
import './assets/scss/styles.css';
import { BrowserRouter as Router } from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <Router>
        <App />
      </Router>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);