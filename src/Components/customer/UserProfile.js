import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, Tab, Tabs, Grid, Paper, Typography, Divider, Avatar, Box, List, ListItemAvatar, ListItem, ListItemText, TextField, useMediaQuery, useTheme, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import '../../styles/styles.css';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Navbar from '../../navbar/Navbar';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../Redux/UserReducer'
import PropTypes from 'prop-types';
import { Add, Apartment, Hotel, House, PinDrop, Work } from '@material-ui/icons';

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
	const [addressType, setAddressType] = React.useState('Home');
	const handleRadioChange = (event) => {
		setValue(event.target.value);
	};
	const user = useSelector((state) => state.user.user)
	const dispatch = useDispatch()
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	React.useEffect(() => {
		fetch("/api/v1/getUser", {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + Cookies.get('token')
			},
		}).then((response) => {
			if (response.status === 403) {
				console.log(response)
				history.push('customer')
			}
			return response.json()
		}).then(resp => {
			dispatch(setUser(resp.data))
		});
	}, [history])

	return (
		<div>
			<Navbar />
			<Paper elevation={3} className={classes.paper}>
				<Grid container>
					<Grid item xs={12} sm={3} md={3}>
						<Container fixed >
							<Avatar alt={user.userName} src={user.profilePicture} className={classes.avatar} text />
							<h4>
								{user.userName}
								{user.isCompleted ? <VerifiedUserIcon color='primary' /> : null}
							</h4>
							<div className={classes.tab}>
								<Tabs
									orientation="vertical"
									indicatorColor='primary'
									TabIndicatorProps
									selectionFollowsFocus
									textColor='primary'
									value={value}
									onChange={handleChange}
									aria-label="Vertical tabs example"
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
										<body>Account Information</body>
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
											defaultValue={user.userName}
											variant="standard"
											disableUnderline={false}
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
											defaultValue={user.userEmail}
											variant="standard"
											disableUnderline={false}
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
											defaultValue={user.mobileNumber}
											variant="standard"
											disableUnderline={false}
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

								{undefined !== user.address && user.address.map((data, index) => (
									<List className={classes.list}>
										<ListItem>
											<ListItemAvatar>
												<Avatar>
													{data.type === 'home' ? <House /> : <Work />}
												</Avatar>
											</ListItemAvatar>
											<ListItemText primary={data.type} secondary={data.address} />
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
									<DialogContent>

										<form  >
											<Grid container spacing={3} >
												<Grid item xs={12} sm={12} md={12} >
													<TextField required fullWidth id="completeAddress" label="Complete Address" variant="outlined" type='input' onChange={(e) => { }} className={classes.textField} />
												</Grid>
												<Grid item xs={12} sm={12} md={12} >
													<TextField id="Floor" fullWidth label="Floor (optional)" variant="outlined" type='input' onChange={(e) => { }} className={classes.textField} />
												</Grid>
												<Grid item xs={12} sm={12} md={12} >
													<TextField id="Landmark" fullWidth label="Nearby Landmark (Optional)" variant="outlined" type='input' onChange={(e) => { }} className={classes.textField} />
												</Grid>
												<Grid item xs={12} sm={12} md={12}>
													<FormControl component="fieldset">
														<RadioGroup row aria-label="addressType" name="addressType" value={addressType} onChange={handleRadioChange}>
															<FormControlLabel
																value="Home"
																control={<Radio color="primary" icon={<House />} />}
																label="Home"

															/>
															<FormControlLabel
																value="Office"
																control={<Radio color="primary" icon={<Work />} />}
																label="Office"
															/>
															<FormControlLabel
																value="Hotel"
																control={<Radio color="primary" icon={<Apartment />} />}
																label="Hotel" />
															<FormControlLabel
																value="Other"
																control={<Radio color="primary" icon={<PinDrop />} />}
																label="Other"
															/>
														</RadioGroup>
													</FormControl>
												</Grid>
											</Grid>
										</form>

									</DialogContent>
									<DialogActions>
										<Button autoFocus onClick={handleClose} color="primary">
											Later
										</Button>
										<Button onClick={handleClose} color="primary" autoFocus>
											Add
										</Button>
									</DialogActions>
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
				<Box p={3}>
					<Typography>{children}</Typography>
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