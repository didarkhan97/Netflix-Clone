import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter from react-router-dom
import App from './App.jsx';
import './index.css';
import Header from './components/Header';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap your App component with BrowserRouter */}
    <Header />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
