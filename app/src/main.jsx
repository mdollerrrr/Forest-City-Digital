import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Use parent project styles (from repo root) so we don't duplicate
import '../../styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
