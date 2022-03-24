//import ActionTypes from "../constants/action-types";

const intialState = {
	products: [],
};

const productsReducer = (state = intialState, action) => {
	switch (action.type) {
		case "SET_PRODUCTS":
			return { ...state, products: action.payload };
		default:
			return state;
	}
};

/* const selectedProductsReducer = (state = {}, { type, payload }) => {
  console.log(type);
  switch (type) {
	case ActionTypes.SELECTED_PRODUCT:
	  return { ...state, ...payload };
	case ActionTypes.REMOVE_SELECTED_PRODUCT:
	  return {};
	default:
	  return state;
  }
}; */

export default productsReducer;