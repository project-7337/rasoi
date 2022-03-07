import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import { Button, Tab, Tabs, Grid, Paper, Typography, Avatar, Box, List, ListItemAvatar, ListItem, ListItemText, TextField, useMediaQuery, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, RadioGroup, FormControlLabel, Radio, CircularProgress, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import '../../styles/styles.css';
import Cookies from 'js-cookie';
import { Container } from 'react-bootstrap';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector, useDispatch } from 'react-redux'
import allActions from '../../Redux/actions';
import PropTypes, { func } from 'prop-types';
import { Add, House, Work } from '@material-ui/icons';
import ApartmentIcon from '@material-ui/icons/Apartment';
import ContactsIcon from '@material-ui/icons/Contacts';
import DeleteIcon from '@material-ui/icons/Delete';
const checkIfEmpty = (obj) => {
	for (var prop in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, prop)) {
			return false;
		}
	}
	return JSON.stringify(obj) === JSON.stringify({});
}


const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(1),

	},
	paper: {
		padding: theme.spacing(2),
		width: '80%',
		justifyContent: 'center',
		flexGrow: 1,
		margin: 'auto',
		borderRadius: 20
	},
	tabPaper: {
		padding: theme.spacing(2),
		justifyContent: 'center',
		flexGrow: 1,
		margin: 'auto',
		borderRadius: 10
	},
	tab: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: 'flex',
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
	avatar: {
		width: theme.spacing(10),
		height: theme.spacing(10),
	},
	textField: {
		border: 'none',

	},
	list: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
}))

export default function AddressForm({isOpen}) {
	const classes = useStyles()
	const history = useHistory()
	const theme = useTheme();

	const [open, setOpen] = React.useState(isOpen);
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [value, setValue] = React.useState(0);
	const user = useSelector((state) => state.userReducer)
	//console.log(user)
	const addList = user.address
	//console.log(addList)
	const [address, setAddress] = React.useState({
		email: '',
		type: 'Home',
		completeAddress: '',
		floor: '',
		landmark: ''
	})

	const handleRadioChange = (event) => {
		setAddress({
			completeAddress: address.completeAddress,
			email: user.userData.userEmail,
			floor: address.floor,
			landmark: address.landmark,
			type: event.target.value
		})
		//console.log(address.type);
	};

	const renderIcon = (type) => {
		switch (type) {
			case "Home":
				return <House />
			case "Hotel":
				return <ApartmentIcon />
			case "Office":
				return <Work />
			default:
				return <ContactsIcon />

		}
	}

	const dispatch = useDispatch()
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		addList.map((data, index) => console.log(data))
		setOpen(false);
	};
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const handleSubmit = (event) => {
		console.log("Adding address")
		event.preventDefault()
		fetch('/api/v1/addAddress', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + Cookies.get('token')
			}, body: JSON.stringify({
				address
			})
		})
			.then((res) => { return res.json() })
			.then((response) => {
				console.log(response)
				if (response.status === 500) {
					setTimeout(() => window.location.reload(), 3000)
				} else {
					dispatch(allActions.userAction.updateAddress(response.data))
					setOpen(false);
				}
			});
	}

	const deleteAddress = (event, address) => {
		event.preventDefault()
		console.log("Deleting address ")
		fetch('/api/v1/deleteAddress', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + Cookies.get('token')
			}, body: JSON.stringify({
				address
			})
		})
			.then((res) => { return res.json() })
			.then((response) => {
				console.log(response)
				if (response.status === 500) {
					setTimeout(() => window.location.reload(), 3000)
				} else {
					dispatch(allActions.userAction.updateAddress(response.data))
					//setTimeout(() => history.push('/'), 3000)
				}
			});
	}
	return <Dialog
		fullScreen={fullScreen}
		open={open}
		onClose={handleClose}
		aria-labelledby="responsive-dialog-title"
	>
		<DialogTitle id="responsive-dialog-title" >{"Add new address"}</DialogTitle>

		<form onSubmit={handleSubmit}>
			<DialogContent>
				<Grid container spacing={3} >
					<Grid item xs={12} sm={12} md={12} >
						<TextField required fullWidth id="completeAddress" label="Complete Address" variant="outlined" type='input' onChange={(e) => {
							setAddress({
								completeAddress: e.target.value,
								email: user.userData.userEmail,
								type: address.type,
								floor: address.floor,
								landmark: address.landmark
							})
						}} className={classes.textField} />
					</Grid>
					<Grid item xs={12} sm={12} md={12} >
						<TextField id="Floor" fullWidth label="Floor (optional)" variant="outlined" type='input' onChange={(e) => {
							setAddress({
								completeAddress: address.completeAddress,
								email: user.userData.userEmail,
								type: address.type,
								landmark: address.landmark,
								floor: e.target.value
							})
						}} className={classes.textField} />
					</Grid>
					<Grid item xs={12} sm={12} md={12} >
						<TextField id="Landmark" fullWidth label="Nearby Landmark (Optional)" variant="outlined" type='input' onChange={(e) => {
							setAddress({
								completeAddress: address.completeAddress,
								email: user.userData.userEmail,
								type: address.type,
								floor: address.floor,
								landmark: e.target.value
							})
						}} className={classes.textField} />
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						<FormControl component="fieldset">
							<RadioGroup row aria-label="addressType" name="addressType" value={address.type} onChange={handleRadioChange}>
								<FormControlLabel
									value="Home"
									control={<Radio color="primary" />}
									label="Home"
								/>
								<FormControlLabel
									value="Office"
									control={<Radio color="primary" />}
									label="Office"
								/>
								<FormControlLabel
									value="Hotel"
									control={<Radio color="primary" />}
									label="Hotel" />
								<FormControlLabel
									value="Other"
									control={<Radio color="primary" />}
									label="Other"
								/>
							</RadioGroup>
						</FormControl>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={handleClose} variant="outlined">
					Later
				</Button>
				<Button type='submit' variant="outlined" autoFocus>
					Add
				</Button>
			</DialogActions>
		</form>
	</Dialog>
}