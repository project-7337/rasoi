import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: {},
	address:{}
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, user) => {
			state.user = user.payload
		},
		SetAddressList:(state,address)=>{
			// console.log(address.payload)
			state.address=address.payload
		}
	},
})
export const { setUser,SetAddressList } = userSlice.actions
export default userSlice.reducer