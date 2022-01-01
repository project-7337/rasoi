import React from 'react'
import axios from 'axios';
import Cookie from 'js-cookie';
import { GoogleLogin } from 'react-google-login';
import Button from '@material-ui/core/Button';

export const axiosApiCall = (url, method, body = {}) => axios({
	method,
	url: `${url}`,
	data: body,
});

export default function Login() {

	const onGoogleSuccess = (response) => {
		const access_token = response.accessToken;
		axiosApiCall(
		  '/auth/google',
		  'post',
		  { access_token }
		).then((res) => {
		  const { user, token } = res.data;
		  // Save the JWT inside a cookie
		  Cookie.set('token', token);
		}).catch((err) => {
		  throw new Error(err);
		})
	  }
	  
	const onGoogleFailure = (err) => {
		console.log(err)
	 };

	return (
		<div
			style={{
				width: "100%",
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#151a30",
				color: "white",
			}}
		>
			<h1>Google Oauth Sign In</h1>
			<GoogleLogin
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
				buttonText="Sign in with Google"
				onSuccess={onGoogleSuccess}
				onFailure={onGoogleFailure}
				className="google-login-button"
			/>
		</div>
	);
}
