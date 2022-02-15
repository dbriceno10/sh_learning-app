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
      console.log(payload);
      let myCourses = JSON.parse(localStorage.getItem("cart"));
      console.log(myCourses);
			if (myCourses) {
        const yaHayCurso = myCourses.filter(course => course.id === payload.id)
        console.log("coincide el id",yaHayCurso);
				myCourses.push(payload);
				localStorage.setItem("cart", JSON.stringify(myCourses));
			} else {
				localStorage.setItem("cart", JSON.stringify(payload));
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
			// let itemToDelete = state.cart.find((item) => item.id === payload);

			return {
				...state,
				cart: state.cart.filter((item) => item.id !== payload),
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
