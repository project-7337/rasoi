import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserReducer'

export const store = configureStore({
	reducer: { user: userReducer },
})