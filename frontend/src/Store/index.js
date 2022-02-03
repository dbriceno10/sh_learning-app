import { createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import loginReducer from "../Reducers/login.reducer";
import thunk from "redux-thunk";
 
const store = createStore(
  loginReducer,
  composeWithDevTools(applyMiddleware(thunk))
);


export default store;