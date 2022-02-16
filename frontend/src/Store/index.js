import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import loginReducer from "../Reducers/login.reducer";
import coursesReducer from "../Reducers/courses.reducer";
import thunk from "redux-thunk";
import filtersReducer from "../Reducers/filters.reducer";
import shoppingReducer from "../Reducers/cart.reducer";
import profileReducer from "../Reducers/Profile.reducer.js"


const store = createStore(
	combineReducers({
		login: loginReducer,
		courses: coursesReducer,
		filters: filtersReducer,
		cart: shoppingReducer,
		student: profileReducer
	}), composeWithDevTools(
		applyMiddleware(thunk)
	));


export default store;