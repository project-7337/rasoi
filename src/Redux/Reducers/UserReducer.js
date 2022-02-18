

const initialState = {
	user: {},
	address: [],
	userData: {}
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case "POST_SIGNIN_SUCCESS":
			return {
				...state,
				userData: action.payload
			}
		default:
			return state
	}
}

export default userReducer;

// export const userSlice = createSlice({
// 	name: 'user',
// 	initialState,
// 	reducers: {
// 		setUser: (state, user) => {
// 			state.user = user.payload
// 		},
// 		SetAddressList: (state, address) => {
// 			// console.log(address.payload)
// 			state.address = address.payload
// 		}
// 	},
// })

// export const { setUser, SetAddressList } = userSlice.actions
// export default userSlice.reducer