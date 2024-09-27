import React from 'react';
import ReactDOM from 'react-dom/client'; // Change to import from 'react-dom/client'
import App from './App';
import './index.css'; // Optional: your CSS file

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);