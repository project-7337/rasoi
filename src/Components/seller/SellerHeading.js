import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Rating from "@material-ui/lab/Rating";
import {Box} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        width: '100%',
    },
    image: {
        width: 450,
        height: 300,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

export default function SellerHeading() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src="https://cdn.pixabay.com/photo/2016/11/21/16/02/outdoor-dining-1846137_960_720.jpg" />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="h2">
                                Cafe Rasoi
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" color="textSecondary">
                                Saket, Delhi
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" color="textSecondary">
                                Timings
                            </Typography>
                            <Chip variant="outlined" color="secondary" icon={<AccessTimeIcon />} label="10:30 AM - 4:30 PM"/>
                        </Grid>
                        <Grid item xs={6}>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Rating name="read-only" value={4} readOnly size="small" />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}