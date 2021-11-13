import React from 'react'
import { Button, Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import '../../styles/styles.css';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import SellerData from "../seller/SellerData";
import clsx from 'clsx';
import Rating from "@material-ui/lab/Rating";
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import {
    Avatar,
    Box,
    Grid,
    Chip,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Paper
} from "@material-ui/core";
import MenuItem from './MenuItem';
import KitchenIcon from '@material-ui/icons/Kitchen';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
            height: theme.spacing(16),
        },
        flexGrow: 1,

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        display: 'flex',
        flexGrow: 1,
        height: '150px',
        color: theme.palette.text.secondary,
    },
    paperDiv: {
        flexGrow: 1,
        display: 'flex',
        // padding: theme.spacing(4),
        height: '100%',

    }
}))



export default function RestaurantData(props) {
    const classes = useStyles()
    const [dense, setDense] = React.useState(true)
    const [secondary, setSecondary] = React.useState(true)
    console.log(props)
    function generate(element) {
        return props.menuItems.map((value) =>
            React.cloneElement(element, {
                key: value
            })
        )
    }
    return (
        <div className={classes.root}>

            <div className={classes.paperDiv}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Typography variant='h5'>{props.fullData.restaurantName}</Typography>
                        <Typography variant='subtitle1'>{props.fullData.restaurantAddress}</Typography>
                        <Typography variant='subtitle1'>{props.fullData.type}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            Timings
                        </Typography>
                        <Chip variant="outlined" color="secondary" icon={<AccessTimeIcon />} label={props.fullData.restaurantTiming} />
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Rating name="read-only" value={props.fullData.rating} readOnly size="small" />
                        </Box>
                    </Grid>
                    {undefined !== props.menuItems && props.menuItems.map((data, index) => (
                        <Grid item xs={3}>
                            <MenuItem
                                menuData={data} />
                        </Grid>
                    ))}

                </Grid>
            </div>
        </div>
    )

}