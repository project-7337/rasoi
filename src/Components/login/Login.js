import React from 'react'
import axios from 'axios';
import Cookie from 'js-cookie';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
import { GoogleLogin } from 'react-google-login';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
}));

export default function Login() {

	const classes = useStyles();
	const history = useHistory()

	const onGoogleSuccess = (response) => {
		const access_token = response.tokenId;
		fetch(
			'/googleLogin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ tokenId: access_token })
		}
		).then((res) => {
			//const { user, token } = res.data;
			//console.log(user)
			// Save the JWT inside a cookie
			//Cookie.set('token', token);
			if (res.status === 200) {
				history.push('/')
			} else {
				history.push('login')
			}
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
				cookiePolicy={'single_host_origin'}
			/>
		</div>
	);
}
