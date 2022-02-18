import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Store/index'
import App from './App';
import axios from "axios" //Importo axios
const API = process.env.REACT_APP_API //Obtengo la variable de entorno con el api
// axios.defaults.baseURL = API || "http://localhost:3001" //Configuración base para conectarse al backend desde local o desde la nube
axios.defaults.baseURL = "http://localhost:3001"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
