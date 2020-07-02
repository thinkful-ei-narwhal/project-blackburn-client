import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App/App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { BlackburnProvider } from './Context/BlackburnContext';

ReactDOM.render(
  <BrowserRouter>
    <BlackburnProvider>
      <App />
    </BlackburnProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
