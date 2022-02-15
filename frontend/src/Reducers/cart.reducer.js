import { ADD_TO_CART, CLEAR_CART, REMOVE_ONE_FROM_CART } from "../Actions/cart.actions";

export const initialState = {
	cart: [],
};

export default function shoppingReducer(state = initialState , { type, payload }) {
	switch (type) {
		case ADD_TO_CART: {
			let newItem = state.products.find((product) => product.id === payload);
			// let itemInCart = state.cart.find((item) => item.id === newItem.id);

			return {
						...state,
						cart: [...state.cart,  ...newItem]
			};
		}
		case REMOVE_ONE_FROM_CART: {
			// let itemToDelete = state.cart.find((item) => item.id === payload);

			return {
						...state,
						cart: state.cart.filter((item) => item.id !== payload),
			};
		}
		// case REMOVE_ALL_FROM_CART:
		// 	return {
		// 		...state,
		// 		cart: state.cart.filter((item) => item.id !== payload),
		// 	};
		case CLEAR_CART:
			return initialState
		default:
			return state;
	}
}