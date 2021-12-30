import React from 'react'
import clsx from 'clsx'
import {AppBar, Badge, IconButton, Toolbar, Typography} from "@material-ui/core"
import {alpha, makeStyles} from '@material-ui/core/styles'
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Main from "../Components/Main";
import MyLocationIcon from '@material-ui/icons/MyLocation';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Logo from '../images/rasoi.svg'
import axios from 'axios';

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
    }
}))

export default function Navbar() {
    const classes = useStyles()
	const login = async ()=>{
		const response = await axios.get("/auth/google")
            console.log(response)
	}
    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="option" sx={{flexGrow: 1}}>
                        <img src={Logo} className={classes.logo} width="90" height="70"/>
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                        />
                    </div>
                    <div className={classes.location}>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <MyLocationIcon/>
                        </IconButton>
                        &nbsp;<Typography variant="caption" sx={{flexGrow: 1}}>
                        Kalkaji Double storey new delhi
                    </Typography>
                    </div>
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
							onClick={login}
                        >
                            <AccountCircle/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <main className={clsx(classes.content)}>
                <Main/>
            </main>
        </div>
    )
}