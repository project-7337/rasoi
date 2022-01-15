import React from 'react'
import './App.css'
import Navbar from "./navbar/Navbar"
import {makeStyles} from '@material-ui/core/styles'
import Customer from './Components/customer/Customer'
import { MuiThemeProvider, createTheme } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%'
    }
}))

const theme = createTheme({
	palette: {
		primary: {
			main: "#ffe01b",
			contrastText: "#fff"
		}
	}
})

function App() {
    const classes = useStyles()
    return (
		<MuiThemeProvider theme={theme}>
			<div className={classes.root}>
				<Navbar/>
			</div>
		</MuiThemeProvider>
    );
}

export default App;
