import { combineReducers } from "redux";
import { productsReducer, selectedProductsReducer } from "./productReducer";
import {UserReducer} from "./UserReducer";
const reducers = combineReducers({
  allProducts: productsReducer,
  product: selectedProductsReducer,
  user: UserReducer
});
export default reducers;