import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import '../../styles/styles.css';
import Rating from "@material-ui/lab/Rating";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {
    Box,
    Grid,
    Chip,
    Typography
} from "@material-ui/core";
import MenuItem from './MenuItem';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
            height: theme.spacing(16),
        },
        flexGrow: 1
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
        height: '100%',
    }
}))

export default function RestaurantData(props) {
    const classes = useStyles()

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
                        <Chip variant="outlined" color="secondary" icon={<AccessTimeIcon/>}
                              label={props.fullData.restaurantTiming}/>
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Rating name="read-only" value={props.fullData.rating} readOnly size="small"/>
                        </Box>
                    </Grid>
                    {undefined !== props.menuItems && props.menuItems.map((data, index) => (
                        <Grid item xs={3}>
                            <MenuItem
                                menuData={data}/>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    )
}