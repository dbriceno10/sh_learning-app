import {
	ADD_TO_CART,
	CLEAR_CART,
	GET_LOCAL_STORAGE,
	REMOVE_ONE_FROM_CART,
} from "../Actions/cart.actions";

export const initialState = {
	cart: null,
	localStorageCart: null,
};

export default function shoppingReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case ADD_TO_CART: {
      // console.log(payload);
      let myCourses = JSON.parse(localStorage.getItem("cart"));
      // console.log(myCourses);
			if (myCourses) {
				myCourses.push(payload);
				localStorage.setItem("cart", JSON.stringify(myCourses));
			} else {
				localStorage.setItem("cart", JSON.stringify([payload]));
			}
			return {
				...state,
				cart: JSON.parse(localStorage.getItem("cart")),
			};
		}
		case GET_LOCAL_STORAGE: {
			return {
				...state,
				localStorageCart: JSON.parse(localStorage.getItem("cart")),
			};
		}
		case REMOVE_ONE_FROM_CART: {
			let newItems = state.localStorageCart.filter((item) => item.id !== payload);
      console.log(newItems);
			return {
				...state,
				localStorageCart: localStorage.setItem("cart", JSON.stringify(newItems)),
			};
		}
		case CLEAR_CART:
      localStorage.removeItem('cart')
			return {
        ...state,
        cart: null,
        localStorageCart: null
      };
		default:
			return state;
	}
}
