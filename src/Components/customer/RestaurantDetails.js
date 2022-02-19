import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import {  useDispatch } from 'react-redux';
import {  addItem } from '../../Redux/reducers/cartReducer'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(1),
		margin: theme.spacing(1),
		// textAlign: 'center',
		display: 'flex',
		flexGrow: 1,
		borderRadius: 10,
		// height: '200px',
		color: theme.palette.text.secondary,
	},
	

}))
export default function RestaurantDetails(props) {
	const data = props.location.state.inputData;
	console.log(data)
	const classes = useStyles(props)
	// const history = useHistory()
	const dispatch = useDispatch()

	// const addToCart = (item) => {
	// 	let dish = { id: item.image_url + item.name, name: item.name, url: item.image_url, price: item.price }
	// 	dispatch(addItem(dish))
	// }	
	return (
		<Grid container spacing={3}>
			<Grid item xs={1} sm={1} md={1} ></Grid>
			<Grid item xs={12} sm={10} md={10}>
				<Paper elevated={3} className={classes.paper} style={{
					backgroundImage: `url(${data.image_url})`,
					backgroundSize: "cover",
					height: '400px'
				}} />
				<Typography variant='h4'>
					{data.name}
				</Typography>
				{data !== undefined && data.menu_item.map((dish, index) => (
					<Paper className={classes.paper}>
						<Grid container spacing={3}>
							<Grid item xs={2} sm={2} md={2} >
								<Box style={{
									backgroundImage: `url(${dish.url})`,
									backgroundSize: 'cover',
									height: '150px',
									width: '150px',
								}} />
							</Grid>
							<Grid item xs={8} sm={8} md={8} >
								<Typography variant='h5'>
									{dish.name}
								</Typography>
								<Typography variant='h5'>
									₹{dish.price}
								</Typography>
							</Grid>
							<Grid item xs={2} sm={2} md={2} >
								<Button onClick={()=>{	
									let item = dish
									let d = { id: item.image_url + item.name, name: item.name, url: item.image_url, price: item.price }
									dispatch(addItem(d))
								}}>Add to cart</Button>
							</Grid>
						</Grid>
					</Paper>
				))}
			</Grid>
			<Grid item xs={1} sm={1} md={1} ></Grid>
		</Grid>
	)
}
