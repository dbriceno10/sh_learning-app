import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from  '@auth0/auth0-react';
import reportWebVitals from './reportWebVitals';

import App from './App';

ReactDOM.render(
  <BrowserRouter>
  <Auth0Provider domain = "dev-7nhgd48t.us.auth0.com" clientId="Jiku3rCKjoBA9TXW0HLOAb9dNye1eVnJ" redirectUri={window.location.origin}> 
    <App />
  </Auth0Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
