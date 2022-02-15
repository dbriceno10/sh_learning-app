// import axios from "axios";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART";
export const REMOVE_ALL_FROM_CART = "REMOVE_ALL_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";


export const addToCart = (id) => ({ type: ADD_TO_CART, payload: id });

export const delFromCart = (id, all = false) =>
	all
		? { type: REMOVE_ALL_FROM_CART, payload: id }
		: { type: REMOVE_ONE_FROM_CART, payload: id };

export const clearCart = () => ({type: CLEAR_CART});