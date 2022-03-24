import React from 'react'
import { GoogleLogin } from 'react-google-login';
import { makeStyles, } from '@material-ui/core/styles';
import {
	Button,
	TextField,
	Grid,
	Paper,
	Typography,
} from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import Logo from '../../images/rasoi.svg'
import { useDispatch } from 'react-redux'
import allActions from '../../Redux/Actions';

const useStyles = makeStyles((theme) => ({
	GAuthButton: {
		padding: theme.spacing(2),
		justifyContent:'center'
	},
	root: {
		flexGrow: 1,
		padding: theme.spacing(2)
	},
	logo:{
		justifyContent:'center'
	}
}));

export default function Login() {

	const classes = useStyles();
	const history = useHistory()
	const dispatch = useDispatch()

	const onGoogleSuccess = (response) => {
		const access_token = response.tokenId;
		fetch(
			'/googleLogin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ tokenId: access_token })
		}
		).then((res) => {
			if (res.status !== 200) {
				history.push('login')
			}
			return res.json()
		}).then((resp)=>{
			// console.log(resp.data);
			dispatch(allActions.userAction.setUser(resp.data));
			if(resp.data.user.isCompleted){
				history.push('/')
			}else{
				history.push('/completeprofile')
			}
		}).catch((err) => {
			console.log(err)
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
				backgroundColor: "#ffe01b",
				color: "white",
			}}
		>
			<Grid container spacing={0} justifyContent="center" direction="row">
				<Grid item>
					<Grid
						container
						direction="column"
						justifyContent="center"
						spacing={2}
						className="login-form"
					>
						<Paper
							variant="elevation"
							elevation={2}
							className="login-background"
						>
							<div className={classes.logo}>
								<img alt="" src={Logo}  width='100'  />
							</div>
							<Grid item className={classes.root}>
								<Typography component="h1" variant="h5">
									Sign into RASOI
								</Typography>
							</Grid>
							<Grid item>
								<form onSubmit={null}>
									<Grid container direction="column" spacing={2}>
										<Grid item>
											<TextField
												type='tel'
												placeholder="Mobile Number"
												fullWidth
												name="mobileNumber"
												variant="outlined"
												value=''
												onChange={(event) =>
													null
												}
												required
												autoFocus
											/>
										</Grid>
										<Grid item>
											<TextField
												type='number'
												placeholder="OTP"
												fullWidth
												name="OTP"
												variant="outlined"
												value={''}
												onChange={(event) =>
													this.setState({
														[event.target.name]: event.target.value,
													})
												}
												required
											/>
										</Grid>
										<Grid item>
											<Button
												variant="contained"
												color="primary"
												type="submit"
												className="button-block"
											>
												Generate OTP
											</Button>
										</Grid>
									</Grid>
								</form>
							</Grid>
							
							<Grid item className={classes.GAuthButton} >
								<GoogleLogin
									clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
									buttonText="Sign in with Google"
									onSuccess={onGoogleSuccess}
									onFailure={onGoogleFailure}
									className="google-login-button"
									cookiePolicy={'single_host_origin'}
								/>
								
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}


