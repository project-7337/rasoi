import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, TextField, useMediaQuery, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import '../../styles/styles.css';
import { useSelector, useDispatch } from 'react-redux'

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

export default function AddressDialog(props) {
	const classes = useStyles()
	//const history = useHistory()
	const theme = useTheme();

	const {  open, onClose, handleSubmit, addressData } = props;

	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [value, setValue] = React.useState(0);
	const user = useSelector((state) => state.userReducer)
	const addList = user.address
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

	const handleClose = () => {
		console.log(addressData);
		onClose();
	};
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return <Dialog
		fullScreen={fullScreen}
		open={open}
		onClose={handleClose}
		aria-labelledby="responsive-dialog-title"
	>
		<DialogTitle id="responsive-dialog-title" >{"Add new address"}</DialogTitle>
		<form onSubmit={(event) => handleSubmit(event, address)}>
			<DialogContent>
				<Grid container spacing={3} >
					<Grid item xs={12} sm={12} md={12} >
						<TextField required fullWidth id="completeAddress" label="Complete Address" variant="outlined" type='input' defaultValue={undefined === addressData ? "Hello" : addressData} onChange={(e) => {
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