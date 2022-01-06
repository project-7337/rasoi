import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import Navbar from '../../navbar/Navbar';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2),

	},
}))

export default function CompleteProfile() {
	const classes = useStyles()
	const history = useHistory()

	return (<div className={classes.root} >
		<Navbar/>
		<form>
			<label>
				Name:
				<input type="text" name="name" />
			</label>
			<br/>
			<label>
				Email:
				<input type="text" name="name" />
			</label>
			<br/>
			<label>
				Mobile number:
				<input type="text" name="name" />
			</label><br/>
			<input type="submit" value="Submit" />
		</form>
	</div>);
}

