import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import { Button, Tab, Tabs, Grid, Paper, Typography, Avatar, Box, List, ListItemAvatar, ListItem, ListItemText, TextField, useMediaQuery, useTheme, CircularProgress, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import '../../styles/styles.css';
import Cookies from 'js-cookie';
import { Container } from 'react-bootstrap';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector, useDispatch } from 'react-redux'
import allActions from '../../Redux/Actions';
import PropTypes from 'prop-types';
import { Add, House, Work } from '@material-ui/icons';
import ApartmentIcon from '@material-ui/icons/Apartment';
import ContactsIcon from '@material-ui/icons/Contacts';
import DeleteIcon from '@material-ui/icons/Delete';
import AddressBox from '../utils/AddressBox';

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

export default function UserProfile() {
	const classes = useStyles()
	const history = useHistory()
	const theme = useTheme();

	const [open, setOpen] = React.useState(false);
	const [operation, setOperation] = React.useState("");

	//const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
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

	const handleClickOpen = (event, val) => {
		event.preventDefault();
		setOpen(true);
		setOperation(val);
	};

	const handleClose = () => {
		setOpen(false);
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

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleSubmit = (event, address) => {
		console.log("Adding address: ", address);
		if (undefined !== address) {
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

	return (
		<div>
			{checkIfEmpty(user.userData) ? <CircularProgress /> :
				<Paper elevation={3} className={classes.paper}>
					<Grid container>
						<Grid item xs={12} sm={3} md={3}>
							<Container fixed="true" >
								<Avatar alt={user.userData.userName} src={user.userData.profilePicture} className={classes.avatar} />
								<h4>
									{user.userData.userName}
									{user.userData.isCompleted ? <VerifiedUserIcon color='primary' /> : null}
								</h4>
								<div className={classes.tab}>
									<Tabs
										key={value}
										orientation="vertical"
										indicatorColor='primary'
										textColor='primary'
										value={value}
										onChange={handleChange}
										className={classes.tabs}
									>
										<Tab label="Account Details" />
										<Tab label="Wallet" />
										<Tab label="Order History" />
										<Tab label="My Addresses" />
										<Tab label="Settings" />
									</Tabs>
								</div>
							</Container>
						</Grid>
						<Grid item xs={12} sm={9} md={9}>
							<TabPanel value={value} index={0}>
								<h3>My Profile</h3>
								<Paper elevation={3} className={classes.tabPaper}>
									<Grid container spacing={1}	>
										<Grid item xs={6} sm={6} md={6}>
											Account Information
										</Grid>
										<Grid item xs={6} sm={6} md={6} >
											<Button variant='text' color='primary' onClick={() => history.push('/completeprofile')} startIcon={<EditIcon />}>
												Edit Profile
											</Button>
										</Grid>
										<Grid item xs={6} sm={6} md={6}>
											<TextField
												disabled
												id="name"
												label='Name'
												fullWidth
												defaultValue={user.userData.userName}
												variant="standard"
												className={classes.textField}

												InputProps={{
													disableUnderline: true,
												}}
											/>
										</Grid>
										<Grid item xs={6} sm={6} md={6} >
											<TextField
												label='Email'
												fullWidth
												defaultValue={user.userData.userEmail}
												variant="standard"
												className={classes.textField}
												disabled
												InputProps={{
													disableUnderline: true,

												}}
											/>
										</Grid>
										<Grid item xs={6} sm={6} md={6} >
											<TextField
												label='Phone Number'
												fullWidth
												defaultValue={user.userData.mobileNumber}
												variant="standard"
												className={classes.textField}
												disabled
												InputProps={{
													disableUnderline: true,

												}}
											/>
										</Grid>
									</Grid>
								</Paper>
							</TabPanel>
							<TabPanel value={value} index={1}>
								<h3>Wallet</h3>
								<Paper elevation={3} className={classes.tabPaper}>
								</Paper>
							</TabPanel>
							<TabPanel value={value} index={2}>
								<h3>Order History</h3>
								<Paper elevation={3} className={classes.tabPaper}>
								</Paper>
							</TabPanel>
							<TabPanel value={value} index={3}>
								<h3>My Addresses</h3>
								<Paper elevation={3} className={classes.tabPaper}>
									{undefined !== addList && addList.length > 0 && addList.map((data, index) => (
										<List key={data._id} className={classes.list}>
											<ListItem>
												<ListItemAvatar>
													<Avatar>
														{renderIcon(data.type)}
													</Avatar>
												</ListItemAvatar>
												<ListItemText primary={data.type} secondary={data.completeAddress} />
												<ListItemSecondaryAction>
													<IconButton edge="end" aria-label="edit" onClick={(e) => handleClickOpen(e, "UPDATE")} >
														<EditIcon />
													</IconButton>
													<IconButton edge="end" aria-label="delete" onClick={(e) => deleteAddress(e, data)}>
														<DeleteIcon />
													</IconButton>
												</ListItemSecondaryAction>
											</ListItem>
										</List>
									))}
									<Button variant='text' color='primary' onClick={(e) => handleClickOpen(e, "ADD")} startIcon={<Add />}>
										Add a new address
									</Button>
									<AddressBox open={open} handleClose={handleClose} handleSubmit={handleSubmit} operation={operation} />
								</Paper>
							</TabPanel>
							<TabPanel value={value} index={4}>
								<h3>Settings</h3>
								<Paper elevation={3} className={classes.tabPaper}>
								</Paper>
							</TabPanel>
						</Grid>
					</Grid>
				</Paper>
			}
		</div>
	)
}

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box>
					<Typography component={'span'}>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};
