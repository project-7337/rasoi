import React from 'react'
import './App.css'
import Navbar from "./navbar/Navbar"
import {makeStyles} from '@material-ui/core/styles'
import Customer from './Components/customer/Customer'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%'
    }
}))

function App() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Navbar/>
        </div>
    );
}

export default App;
