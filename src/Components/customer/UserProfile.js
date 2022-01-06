import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, CardMedia, Grid, Typography } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import '../../styles/styles.css';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Row, Col, Form } from 'react-bootstrap';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2)
	},
	align: {
		textAlign: 'center'
	},
	title: {
		fontFamily: 'Roboto',
		margin: 'auto',
		fontSize: '30'
	},
	divider: {
		margin: theme.spacing(3, 0)
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
}))




export default function UserProfile() {
	const classes = useStyles()
	const history = useHistory()

	const [userData, setUserData] = React.useState({
		user: {}
	})

	React.useEffect(() => {

		fetch("/api/v1/addUser", {
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
		<Container>
			<Row>
				<Col>
					<img src={userData.user.profilePicture} alt="profils pic" />
					<p>
						{userData.user.userName}
					</p>
				</Col>
			</Row>
		</Container>
	)
}
