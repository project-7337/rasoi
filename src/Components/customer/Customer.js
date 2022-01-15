import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, CardMedia, Grid, Typography } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import '../../styles/styles.css';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import Cookies from 'js-cookie';
import RestaurantData from './RestaurantData';
import { SearchBar } from './SearchBar';

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


export default function Customer() {
	const classes = useStyles()
	const history = useHistory()

	const [restaurantData, setRestaurantData] = React.useState({
		details: []
	})

	React.useEffect(() => {
		fetch("/api/v1/fetchRestaurantData", {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + Cookies.get('token')
			},
		}).then(response => {
			if (response.status === 403) {
				history.push('login')
			}
			return response.json()
		}).then(resp => {
			console.log(resp.data)
			setRestaurantData(restaurantData => ({ ...restaurantData, details: resp.data }))
		})

	}, [history])

	return (
		<div className={classes.root}>
			<Carousel
				navButtonsAlwaysVisible={true}
				animation="slide">
				{
					items.map((item, index) => {
						return <Banner item={item} key={index} contentPosition={item.contentPosition} />
					})
				}
			</Carousel>
			<SearchBar />
			<Grid container spacing={3} >
				<Grid item xs={2} sm={2} md={1}>

				</Grid>
				<Grid item xs={8} sm={8} md={10}>
					<RestaurantData
						data={restaurantData.details} />
				</Grid>
				<Grid item xs={2} sm={2} md={1}>

				</Grid>
			</Grid>
		</div>
	)
}

const Banner = (props) => {

	const contentPosition = props.contentPosition ? props.contentPosition : "left"
	const totalItems = props.length ? props.length : 3;
	const mediaLength = totalItems - 1;

	let items = [];
	const content = (
		<Grid item xs={4} key="content">
			<CardContent className="Content">
				<Typography className="Title">
					{props.item.Name}
				</Typography>

				<Typography className="Caption">
					{props.item.Caption}
				</Typography>

				<Button variant="outlined" className="ViewButton">
					View Now
				</Button>
			</CardContent>
		</Grid>
	)

	for (let i = 0; i < mediaLength; i++) {
		const item = props.item.Items[i];

		const media = (
			<Grid item xs={4} key={item.Name}>
				<CardMedia
					className="Media"
					image={item.Image}
					title={item.Name}
				>
					<Typography className="MediaCaption">
						{item.Name}
					</Typography>
				</CardMedia>

			</Grid>
		)

		items.push(media);
	}

	if (contentPosition === "left") {
		items.unshift(content);
	} else if (contentPosition === "right") {
		items.push(content);
	} else if (contentPosition === "middle") {
		items.splice(items.length / 2, 0, content);
	}

	return (
		<Card raised className="Banner">
			<Grid container spacing={0} className="BannerGrid">
				{items}
			</Grid>
		</Card>
	)
}

const items = [
	{
		Name: "DEAL OF THE DAY",
		Caption: "Grab it now",
		contentPosition: "left",
		Items: [
			{
				Name: "Dal Makhni",
				Image: "https://www.vegrecipesofindia.com/wp-content/uploads/2015/01/dal-makhani-recipe-1.jpg"
			},
			{
				Name: "Paneer butter masala",
				Image: "https://www.ruchiskitchen.com/wp-content/uploads/2020/12/Paneer-butter-masala-recipe-3-500x500.jpg"
			}
		]
	},
	{
		Name: "Top Picks",
		Caption: "We know whats best for you",
		contentPosition: "middle",
		Items: [
			{
				Name: "khandani Pakode",
				Image: "https://media-cdn.tripadvisor.com/media/photo-s/16/b2/35/30/photo0jpg.jpg"
			},
			{
				Name: "Bittu Tikki Vala",
				Image: "https://i.ytimg.com/vi/3MgsACjRq9E/hqdefault.jpg"
			}
		]
	}
]