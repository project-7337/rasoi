import { Icon, IconButton, Menu, MenuItem, Toolbar } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	toolbarIcon: {
		marginLeft: 'auto'
	}
}))

export default function SessionInfo() {

	const classes = useStyles()
	const history = useHistory()

	const [anchorEl, setAnchorEl] = React.useState(null)

	const handleProfileMenuOption = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	React.useEffect(() => {
		let unmounted = false
		fetch("/api/v1/fetchSessionInfo", {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			}
		})
		.then(response => response.json())
		.then(response => {
			console.log(response)
		})
		return () => {
			unmounted = true
		}
	}, [])

	return (
		<Toolbar>
			<MenuItem onClick={handleProfileMenuOption} className={classes.toolbarIcon}>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-name"
					aria-haspopup="true"
					color="inherit">
						<Icon>account_circle</Icon>
					</IconButton>
			</MenuItem>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				getContentAnchorEl={null}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				transformOrigin={{ vertical: "top", horizontal:"center" }}
				onClose={handleClose}>
					<MenuItem onClick={handleClose}>N/A</MenuItem>
					<MenuItem>Logout</MenuItem>
				</Menu>
		</Toolbar>
	)
}