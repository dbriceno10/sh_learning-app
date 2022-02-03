import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Store/index'

import App from './App';


import App from './App';

ReactDOM.render(
  <BrowserRouter>
<<<<<<< HEAD
    <App />
=======
    <Provider store ={store}>
      <App />
    </Provider>
>>>>>>> 54a36d39d80a2f434af2e663477ac976a414b3b0
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
