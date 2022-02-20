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
				userData: action.payload.user,
				address: action.payload.address
			}
		case "ADDRESS_UPDATE":
			return {
				...state,
				address: action.payload
			}
		default:
			return state
	}
}

export default userReducer;
