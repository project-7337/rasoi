import rootReducer from "./reducers";
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {};
const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/*import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../Redux/Reducers/UserReducer'
import cartReducer from './cartReducer'
import { createStore } from "redux";
import reducers from "./Reducers/index";*/

/*export const store = configureStore({
	reducer: {
		cart: cartReducer,
		user: userReducer,
	},
})


export const productStore = createStore(
  reducers,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);*/
const persistConfig = {
	key: 'root',
	storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const appStore = createStore(
	persistedReducer, 
	initialState,
	composeEnhancers(
		applyMiddleware(...middlewares)
	)
)
const persistor = persistStore(appStore)



export  {appStore,persistor};
