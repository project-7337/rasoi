import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {Box, Divider, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
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
    }
}))

export default function Seller() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Typography component="div" className={classes.align} >
                <Box display="flex" p={1}>
                    <Box p={1} flexGrow={1}>
                        <p className={classes.title}>Welcome Seller</p>
                    </Box>
                </Box>
            </Typography>
            <Divider className={classes.divider}>

            </Divider>
        </div>
    )
}