const setUser = (userObj) => {
	return {
		type: "POST_SIGNIN_SUCCESS",
		payload: userObj
	}
};

export default {
	setUser
};