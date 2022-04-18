import { SET_FILTER_CATEGORY, SET_ORDER } from "../Actions/filter.actions";

const initialState = {
  category: "",
  order: "",
};

function filtersReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_FILTER_CATEGORY:
      console.log(payload);
      return {
        ...state,
        category: payload,
      };
    case SET_ORDER:
      return {
        ...state,
        order: payload,
      };
    default:
      return state;
  }
}

export default filtersReducer;
