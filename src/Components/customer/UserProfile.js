import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, Tab, Tabs, Grid, Paper, Typography, Divider } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import '../../styles/styles.css';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Navbar from '../../navbar/Navbar';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(1),

	},
	paper: {
		padding: theme.spacing(2),
		width: '70%',
		justifyContent: 'center',
		margin: 'auto',
		backgroundImage:'url(https://img.onmanorama.com/content/dam/mm/en/food/features/images/2022/1/2/kids-food.jpg)'
	},
	tab: {
		width: '90%',
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: 'flex',
		height: 224,

	},
	tabs: {
		
		borderRight: `1px solid ${theme.palette.divider}`,
	},
}))




export default function UserProfile() {
	const classes = useStyles()
	const history = useHistory()
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const [userData, setUserData] = React.useState({
		user: {}
	})

	React.useEffect(() => {
		fetch("/api/v1/getUser", {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + Cookies.get('token')
			},
		}).then((response) => {
			console.log(response)
			if (response.status === 403) {
				console.log(response)
				history.push('customer')
			}
			return response.json()
		}).then(resp => {
			console.log(resp.data)
			setUserData(userData => ({ ...userData, user: resp.data }))
		});
	}, [history])

	return (
		<div>
			<Navbar />
			<Paper elevation={3} className={classes.paper}>
				<Grid container>
					<Grid item xs={12} md={8}>
						<img src={userData.user.profilePicture} alt="profils pic" />
						<h3>
							{userData.user.userName}
							{userData.user.isCompleted ? <VerifiedUserIcon color='primary' /> : null}
						</h3>
						<h3>
							{userData.user.userEmail}
						</h3>
					</Grid>
					<Grid item >
						<Button variant='contained' color='primary' onClick={() => history.push('/completeprofile')} startIcon={<EditIcon />}>
							Edit Profile
						</Button>
					</Grid>
				</Grid>
			</Paper>
			<div className={classes.tab}>
				<Tabs
					orientation="vertical"
					variant="scrollable"
					value={value}
					onChange={handleChange}
					aria-label="Vertical tabs example"
					className={classes.tabs}
				>
					<Tab label="Wallet" />
					<Tab label="Order History" />
					<Tab label="My Addresses" />
					<Tab label="Settings" />
				</Tabs>
			</div>
		</div>
	)
}
