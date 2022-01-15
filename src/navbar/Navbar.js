import React from 'react'
import clsx from 'clsx'
import { AppBar, Badge, IconButton, Toolbar, Menu, MenuItem, Typography } from "@material-ui/core"
import { alpha, makeStyles } from '@material-ui/core/styles'
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Main from "../Components/Main";
import UserProfile from '../Components/customer/UserProfile';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import MailIcon from '@material-ui/icons/Mail';
import MoreIcon from '@material-ui/icons/MoreVert';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Logo from '../images/rasoi.svg'
import SessionInfo from '../Components/utils/SessionInfo';
import { useHistory, Redirect } from 'react-router-dom'
import { ThemeContext, themes } from '../Themes/theme';
import Geocode from "react-geocode";
import { SearchBar } from '../Components/customer/SearchBar';

const useStyles = makeStyles(theme => ({
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		flexGrow: 1,
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
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
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
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


	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<SessionInfo />
			</MenuItem>
		</Menu>
	);


	return (
		<div className={classes.grow}>
			<AppBar position="sticky" color='primary'>
				<Toolbar>
					<Typography className={classes.title} variant="h6" noWrap>
						<a href="/">
							<img src={Logo} className={classes.logo} width="90" height="70" />
						</a>
					</Typography>
					<div className={classes.search}>
						<SearchBar />
					</div>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<SessionInfo />
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			<main className={clsx(classes.content)}>
				<Main />
			</main>
		</div>
	)
}