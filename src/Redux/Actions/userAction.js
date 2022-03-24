const setUser = (userObj) => {
	return {
		type: "POST_SIGNIN_SUCCESS",
		payload: userObj
	}
};

const updateAddress = (userObj) => {
	return {
		type: "ADDRESS_UPDATE",
		payload: userObj
	}
};

export default {
	setUser,
	updateAddress
};