import rootReducer from "./reducers";
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {};
const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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
