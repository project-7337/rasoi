import React from 'react'
import clsx from 'clsx'
import { AppBar, Badge, Button, IconButton, Toolbar, Typography } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Main from "../Components/Main";
import MyLocationIcon from '@material-ui/icons/MyLocation';
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(8),
        maxWidth: '100%'
    },
    sectionDesktop: {
        position: 'fixed',
        right: '1%'
    },
    location:{
        margin:'auto',
        position: 'center'
    }
}))

export default function Navbar() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Rasoi
                    </Typography>
                    <div className={classes.location}>
                    <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <MyLocationIcon />
                    </IconButton>
                    <Typography variant="h10" component="div" sx={{ flexGrow: 1 }}>
                        Kalkaji Double storey new delhi
                    </Typography>
                    </div>
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <main className={clsx(classes.content)}>
                <Main />
            </main>
        </div>
    )
}