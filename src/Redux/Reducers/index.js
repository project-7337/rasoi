import {combineReducers} from "redux";
import productReducer from "./productReducer";
import userReducer from "./UserReducer";

export default combineReducers({
	userReducer,
	productReducer
});