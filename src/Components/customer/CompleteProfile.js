import React, { useReducer, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import Navbar from '../../navbar/Navbar';
import { Button, Card, CircularProgress, Grid, Paper, Typography, TextField, Snackbar } from "@material-ui/core";
import Cookies from 'js-cookie';
import { Alert } from '@material-ui/lab'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../Redux/UserReducer'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		paddingBottom: 20,
		// backgroundColor:'yellow'
	},
	paper: {
		height: '80%',
		width: '50%',
		textAlign: 'center',
		rounded: true,
		padding: theme.spacing(2),
		opacity: 0.8,
		margin: 'auto',
	},
	textField: {
		padding: theme.spacing(1), margin: 'auto'
	},
	button: {
		padding: theme.spacing(1),
		margin: 'auto'
	}
}))

export default function CompleteProfile() {
	const classes = useStyles()
	const history = useHistory()
	const user = useSelector((state) => state.user.user)
	const dispatch = useDispatch()
	const [name, setName] = useState(user.userName)
	const [email, setEmail] = useState(user.userEmail)
	const [address, setAddress] = useState((user.address.length > 0) ? user.address[0].address : [] )
	const [mobileNumber, setMobileNumber] = useState(user.mobileNumber??'')
	const [ErrorMobile, setErrorMobileNumber] = useState(false)
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState();
	const [isLoading, setLoader] = useState(false);
	

	const phoneValidate = (mobileNumber) => {
		if (mobileNumber.length == 0 || mobileNumber.length == 10) {
			console.log("valid mobileNUmber")
			return true;
		} else {
			setMessage('Invalid Mobile Number')
			setErrorMobileNumber(true)
			setOpen(true)
			setLoader(false)
			return false;
		}
	}
	const handleSubmit = (event) => {
		event.preventDefault()
		setErrorMobileNumber(false)
		setOpen(false)
		setLoader(true)
		if (phoneValidate(mobileNumber)) {
			fetch('/api/v1/updateUser', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Cookies.get('token')
				}, body: JSON.stringify({
					name: name,
					email: email,
					address: address,
					mobileNumber: mobileNumber
				})
			}).then((res) => { return res.json() }).then((response) => {
				console.log(response.message)
				setMessage(response.message)
				setOpen(true)
				if (response.status == 500) {
					
					setTimeout(() => window.location.reload(), 3000)
				} else {
					setTimeout(() => history.push('/UserProfile'), 3000)
				}
			});
		}
	}
	return (<div className={classes.root} >
		<Navbar />

		<Paper elevation={3} className={classes.paper}>
			<Typography classNames={classes.root} gutterBottom={true} variant='h5' >Please Complete your Profile</Typography>
			<form onSubmit={handleSubmit} >
				<Grid container spacing={3} >
					<Grid item xs={12} sm={12} md={6} >
						<TextField required id="name" label="Name" variant="outlined" defaultValue={name} type='input' onChange={(e) => { setName(e.target.value) }} className={classes.textField} />
					</Grid>
					<Grid item xs={12} sm={12} md={6} >
						<TextField disabled id="email" label="Email" variant="outlined" defaultValue={email} onChange={(e) => { setEmail(e.target.value) }} className={classes.textField} />
					</Grid>
					<Grid item xs={12} sm={12} md={6} >
						<TextField id="address" label="Address" placeholder="Enter you home address" defaultValue={address} variant="outlined" onChange={(e) => { setAddress(e.target.value) }} multiline className={classes.textField} />
					</Grid>
					<Grid item xs={12} sm={12} md={6} >
						<TextField id="mobileNumber" error={ErrorMobile} label="Contact number" type='number'  variant="outlined" defaultValue={mobileNumber} onChange={(e) => { setMobileNumber(e.target.value) }} className={classes.textField} />
					</Grid>
					<Snackbar open={open} autoHideDuration={6000}>
						<Alert severity="info">{message}</Alert>
					</Snackbar>
				</Grid>
				<Button variant="text" onClick={() => { history.push('/') }} color='primary' className={classes.button}>Skip For Now</Button>

				{isLoading ? <CircularProgress />: <Button variant="contained" type='submit' color='primary' className={classes.button}>SUBMIT</Button>}


			</form>
		</Paper>
	</div>);
}

