import React from 'react'
import clsx from 'clsx'
import { AppBar, Badge, IconButton, Toolbar, Typography, Button } from "@material-ui/core"
import { alpha, makeStyles } from '@material-ui/core/styles'
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Main from "../Components/Main";
import UserProfile from '../Components/customer/UserProfile';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Logo from '../images/rasoi.svg'
import SessionInfo from '../Components/utils/SessionInfo';
import { useHistory, Redirect } from 'react-router-dom'
import { ThemeContext, themes } from '../Themes/theme';
import Geocode from "react-geocode";

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		width: '100%'
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(6),
		maxWidth: '100%'
	},
	sectionDesktop: {
		position: 'fixed',
		right: '1%'
	},
	location: {
		margin: 'auto',
		position: 'center'
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: alpha(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
	logo: {
	},
	notifications: {
		position: 'fixed',
		right: '10%'
	},
	sessionInfo: {
		// position: 'fixed',
		// right: '1%'
	}
}))

export default function Navbar() {
	const classes = useStyles()
	const history = useHistory()
	const [darkMode, setDarkMode] = React.useState(true);
	//location service
	Geocode.setApiKey(""); // Add api key to enable location service
	Geocode.setLanguage("en");
	Geocode.setRegion("es");
	Geocode.setLocationType("ROOFTOP");
	Geocode.enableDebug();
	
	const componentDidMount = () => {
		navigator.geolocation.getCurrentPosition(
			function (position) {
				Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
					(response) => {
					  const address = response.results[0].formatted_address;
					  console.log(address);
					},
					(error) => {
					  console.error(error);
					}
				  );
			},
			function (error) {
				console.error("Error Code = " + error.code + " - " + error.message);
			}
		);
	}
	return (
		<div className={classes.root}>
			<AppBar position="fixed">
				<Toolbar>
					<Typography variant="caption" sx={{ flexGrow: 1 }}>
						<a href="/">	<img src={Logo} className={classes.logo} width="90" height="70" /></a>
					</Typography>
					{/* <div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div> */}
					<div className={classes.location}>
						<IconButton
							edge="end"
							aria-label="account of current user"
							aria-haspopup="true"
							onClick={componentDidMount}
						>
							<MyLocationIcon />
						</IconButton>
						&nbsp;<Typography variant="caption" sx={{ flexGrow: 1 }}>
							Kalkaji Double storey new delhi
						</Typography>
					</div>
					<div>
						<ThemeContext.Consumer>
							{({ changeTheme }) => (
								<IconButton
									color="link"
									onClick={() => {
										setDarkMode(!darkMode);
										changeTheme(darkMode ? themes.light : themes.dark);
									}}
								>
									<i className={darkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
									<span className="d-lg-none d-md-block"></span>
								</IconButton>
							)}
						</ThemeContext.Consumer>
					</div>
					<div className={classes.sessionInfo}>
						<SessionInfo />
					</div>
				</Toolbar>
			</AppBar>
			<main className={clsx(classes.content)}>
				<Main />
			</main>
		</div>
	)
}