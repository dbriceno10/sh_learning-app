import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Store/index'
import App from './App';
import axios from "axios" //Importo axios
import dotenv from "dotenv"; //Importo dotenv
dotenv.config(); //Configuro dotenv
axios.defaults.baseURL = process.env.REACT_APP_API || `http://localhost:${process.env.PORT}`; //Configuración base para conectarse al backend desde local o desde la nube

ReactDOM.render(
  <BrowserRouter>
    <Provider store ={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
