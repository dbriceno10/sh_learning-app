import { createStore, applyMiddleware, combineReducers} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import loginReducer from "../Reducers/login.reducer";
import coursesReducer from "../Reducers/courses.reducer";
import thunk from "redux-thunk";


const store= createStore(
	combineReducers({
	login: loginReducer,
  courses: coursesReducer
	}), composeWithDevTools(
		applyMiddleware(thunk) 
	));


export default store;