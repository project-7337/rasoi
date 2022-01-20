import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserReducer'
import cartReducer from './cartReducer'

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		user: userReducer,
	},
})