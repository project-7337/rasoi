import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import '../../styles/styles.css';
import Rating from "@material-ui/icons/StarRate";
import {
	Box,
	Grid,
	Typography,
	Card, CardActionArea, CardMedia, CardContent,
} from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
	root: {
		// display: 'flex',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(1),
			width: '100%',
			height: theme.spacing(16),
		},
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		display: 'flex',
		flexGrow: 1,
		borderRadius: 30,
		color: theme.palette.text.secondary,
	},
	cardContent: {
		height: '80px',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	card: {
		height: '100%',
		borderRadius: 20
	},
	paperDiv: {
		flexGrow: 1,
		display: 'flex',
		// height: '100%',
	},
	rate: {
		color: 'white',
		backgroundColor: 'green',
		borderRadius: 5,
		justifyContent: 'center',
		padding: '1px',
	},
	media: {
		height: 200,
		borderRadius: 10,
		margin: theme.spacing(1)
	},
}))

export default function RestaurantData() {
	const classes = useStyles()
	const history = useHistory()
	let restaurant = useSelector((state) => state.productReducer.products);

	let iconStyles = { color: "white", fontSize: "1rem" };

	const onCardClick = (cardData) => event => {
		event.preventDefault()
		history.push({ pathname: 'RestaurantDetails', state: { inputData: cardData } })
	}

	return (
		<div className={classes.root}>
			<div className={classes.paperDiv}>
				<Grid container spacing={5} >
					{undefined!== restaurant && Object.keys(restaurant).length !== 0 && restaurant.map((data, index) => (
						<Grid item xs={12} sm={6} md={4} key={index} >
							<Card className={classes.card} >
								<CardActionArea onClick={onCardClick(data)}>
									<CardMedia
										className={classes.media}
										image={data.image_url}
										title={data.name}
									/>
									<CardContent className={classes.cardContent} >
										<Grid container wrap="nowrap" spacing={2}>
											<Grid item xs zeroMinWidth>
												<Typography noWrap gutterBottom variant="body1" component="h2">
													{data.name}
												</Typography>
											</Grid>
											<Grid item>
												{/* <Chip icon={<Rating fontSize='small'/>}  size='small' label={data.rate} color='primary'/> */}
												<Box className={classes.rate} >
													{data.rate}
													<Rating style={iconStyles} />
												</Box>
											</Grid>
										</Grid>
										<Grid container wrap="nowrap" spacing={2}>
											<Grid item xs zeroMinWidth>
												<Typography noWrap variant="body2" color="textSecondary" component="p">
													{data.cuisines}
												</Typography>
											</Grid>
											<Grid item>
												<Typography noWrap variant="body2" color="textSecondary" component="p">
													₹{data.costForTwo} for two
												</Typography>
											</Grid>
										</Grid>
									</CardContent>
								</CardActionArea>
							</Card>
						</Grid>
					))}
				</Grid>
			</div>
		</div>
	)
}