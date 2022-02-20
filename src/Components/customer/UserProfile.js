import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import { Button, Tab, Tabs, Grid, Paper, Typography, Avatar, Box, List, ListItemAvatar, ListItem, ListItemText, TextField, useMediaQuery, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, FormControl,RadioGroup, FormControlLabel, Radio, CircularProgress } from "@material-ui/core";
import '../../styles/styles.css';
import Cookies from 'js-cookie';
import { Container} from 'react-bootstrap';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector, useDispatch } from 'react-redux'
import allActions from '../../Redux/actions';
import PropTypes from 'prop-types';
import { Add, House, Work } from '@material-ui/icons';

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
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [value, setValue] = React.useState(0);
	const user = useSelector((state) => state.userReducer)
	//console.log(user)
	const addList = user.userData.address
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
			email: user.userData.user.userEmail,
			floor: address.floor,
			landmark: address.landmark,
			type: event.target.value
		})
		//console.log(address.type);
	};

	const dispatch = useDispatch()
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		addList.map((data,index)=>console.log(data))
		setOpen(false);
	};
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const handleSubmit = (event) => {
		event.preventDefault()
		fetch('/api/v1/addAddress', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + Cookies.get('token')
			}, body: JSON.stringify({
				address
			})
		}).then((res) => { return res.json() }).then((response) => {
			//console.log(response)
			if (response.status === 500) {
				setTimeout(() => window.location.reload(), 3000)
			} else {
				setTimeout(() => history.push('/'), 3000)
			}
		});
	}
	React.useEffect(() => {
		//console.log("useeffect")
		fetch("/api/v1/getUser", {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + Cookies.get('token')
			},
		}).then((response) => {
			if (response.status === 403) {
				//console.log(response)
				history.push('customer')
			}
			return response.json()
		}).then(resp => {
			//console.log(resp.data);
			dispatch(allActions.userAction.setUser(resp.data));
			// dispatch(userReducer(resp.data.user))
			// dispatch(SetAddressList(resp.data.address))
		});
	}, [history, dispatch])

	return (
		<div>
			{undefined === user.userData.user ?<CircularProgress/>:
			<Paper elevation={3} className={classes.paper}>
				<Grid container>
					<Grid item xs={12} sm={3} md={3}>
						<Container fixed="true" >
							<Avatar alt={user.userData.user.userName} src={user.userData.user.profilePicture} className={classes.avatar}  />
							<h4>
								{user.userData.user.userName}
								{user.userData.user.isCompleted ? <VerifiedUserIcon color='primary' /> : null}
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
											defaultValue={user.userData.user.userName}
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
											defaultValue={user.userData.user.userEmail}
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
											defaultValue={user.userData.user.mobileNumber}
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

								{undefined !== addList && addList.length>0 && addList.map((data, index) => (
									<List  key={data.completeAddress} className={classes.list}>
										<ListItem>
											<ListItemAvatar>
												<Avatar>
													{data.type === 'home' ? <House /> : <Work />}
												</Avatar>
											</ListItemAvatar>
											<ListItemText primary={data.type} secondary={data.completeAddress} />
										</ListItem>
									</List>
								))}
								<Button variant='text' color='primary' onClick={handleClickOpen} startIcon={<Add />}>
									Add a new address
								</Button>
								<Dialog
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
															email: user.userData.user.userEmail,
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
															email: user.userData.user.userEmail,
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
															email: user.userData.user.userEmail,
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
							</Paper>

						</TabPanel>
						<TabPanel value={value} index={4}>
							<h3>Settings</h3>
							<Paper elevation={3} className={classes.tabPaper}>

							</Paper>

						</TabPanel>
					</Grid>
					{/* <Grid item >
						<Button variant='contained' color='primary' onClick={() => history.push('/completeprofile')} startIcon={<EditIcon />}>
							Edit Profile
						</Button>
					</Grid> */}
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