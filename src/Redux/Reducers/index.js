import {combineReducers} from "redux";
import productReducer from "./productReducer";
import userReducer from "./userReducer";

export default combineReducers({
	userReducer,
	productReducer
});