import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, Tab, Tabs, Grid, Paper, Typography, Divider, Avatar, Box, List, ListItemAvatar, ListItem, ListItemText, TextField } from "@material-ui/core";
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
	textField:{
		border:'none',
		
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
	const [value, setValue] = React.useState(0);
	const user = useSelector((state) => state.user.user)
	const dispatch = useDispatch()
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
								<Button variant='text' color='primary' onClick={() => { }} startIcon={<Add />}>
									Add a new address
								</Button>
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