import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../Redux/Reducers/UserReducer'
import cartReducer from './cartReducer'
import { createStore } from "redux";
import reducers from "./Reducers/index";

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		user: userReducer,
	},
})


export const productStore = createStore(
  reducers,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

