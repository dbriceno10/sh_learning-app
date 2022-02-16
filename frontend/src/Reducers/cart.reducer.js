import {
	ADD_TO_CART,
	CLEAR_CART,
	GET_LOCAL_STORAGE,
	REMOVE_ONE_FROM_CART,
} from "../Actions/cart.actions";

export const initialState = {
	localStorageCart: null,
};

export default function shoppingReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case ADD_TO_CART: {
      // console.log(payload);
      // Traigo el item de localStorage 
      let myCourses = JSON.parse(localStorage.getItem("cart"));
      // console.log(myCourses);
			if (myCourses) { // Si existe ese array, le pusheo el nuevo objeto (payload)
				myCourses.push(payload);
				localStorage.setItem("cart", JSON.stringify(myCourses));
			} else { // Si no existe, seteo el localStorage con un array de objetos
				localStorage.setItem("cart", JSON.stringify([payload]));
			}
			return {
				...state,
				localStorageCart: JSON.parse(localStorage.getItem("cart")),
			};
		}
		case GET_LOCAL_STORAGE: {
			return {
				...state,
				localStorageCart: JSON.parse(localStorage.getItem("cart")),
			};
		}
		case REMOVE_ONE_FROM_CART: {
			// let itemToDelete = state.cart.find((item) => item.id === payload);
      // console.log(payload);
      let newItems = state.localStorageCart.filter((item) => item.id !== payload);
      // console.log(newItems);

			return {
				...state,
				localStorageCart: localStorage.setItem("cart", JSON.stringify(newItems)),
			};
		}
		case CLEAR_CART:
      localStorage.removeItem('cart')
			return {
        ...state,
        localStorageCart: null
      };
		default:
			return state;
	}
}
