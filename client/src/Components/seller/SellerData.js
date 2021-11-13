import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import KitchenIcon from '@material-ui/icons/Kitchen';
import {
    Avatar,
    Box, Chip,
    Grid, IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import OrderTimeline from "./OrderTimeline";
import {loadCSS} from "fg-loadcss";
import Icon from "@material-ui/core/Icon";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FastfoodIcon from '@material-ui/icons/Fastfood';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '100%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    title: {
        margin: theme.spacing(4, 0, 2),
        padding: theme.spacing(1, 2)
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    paperDiv: {
        padding: theme.spacing(3),
        flexGrow: 1,
        display: 'flex',
        height: '100%',
    },
    menuItemsImages: {
        height: '150px',
        width: '180px'
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default function SellerData(props) {
    const classes = useStyles()
    const [dense] = React.useState(true)

    React.useEffect(() => {
        const node = loadCSS(
            'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );
        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);

    return (
        <div className={classes.root}>
            {(props.type === 'menu') ?
                <div className={classes.paperDiv}>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            {(undefined !== props.fullData.itemImage) ?
                            <img alt={props.fullData.itemName} className={classes.menuItemsImages} src={props.fullData.itemImage}/>
                            : <img alt={props.fullData.itemName} className={classes.menuItemsImages} src="https://cdn2.iconfinder.com/data/icons/food-restaurant-1/128/flat-11-512.png"/>}
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="h6">{props.fullData.itemName}</Typography>
                            <Chip variant="outlined" color="default" icon={<FiberManualRecordIcon
                                style={{color: (props.fullData.itemType === 'veg' || props.fullData.itemType === 'Veg') ? 'green' : 'red'}}/>}
                                  label={props.fullData.itemType}/>
                        </Grid>
                        <Grid item xs={2}>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Chip variant="outlined" color="default" label={"quantity :" + props.fullData.itemQuantity}/>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Chip variant="outlined" color="default"
                                      icon={<Icon className="fas fa-rupee-sign" style={{fontSize: 15}}/>}
                                      label={props.amount}/>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.button}
                                    startIcon={<EditIcon />}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<DeleteIcon />}
                                >
                                    Delete
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
                : <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1c-content"
                        id="panel1c-header"
                    >
                        <div className={classes.column}>
                            <Typography className={classes.heading}>{props.bookingName}</Typography>
                            <Typography variant="subtitle1">{props.bookingAddress}</Typography>
                        </div>
                        <div className={classes.column}>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <OrderTimeline/>
                            </Box>
                        </div>
                        <div className={classes.column} style={{textAlign: 'right'}}>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography className={classes.heading}><Icon className="fas fa-rupee-sign"
                                                                              style={{fontSize: 15}}/> {props.bookingAmount}
                                </Typography>
                            </Box>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails className={classes.details}>
                        <div className={classes.column}>
                        </div>
                    </AccordionDetails>
                    <Divider/>
                    <Grid item xs={12}>
                        <Typography variant="h6" className={classes.title}>
                            Booking items
                        </Typography>
                        <div>
                            <List dense={dense}>
                                {undefined !== props.bookingItems && props.bookingItems.map((data, index) => (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FastfoodIcon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={data.itemName}
                                            secondary={<Chip variant="outlined" color="default" icon={<FiberManualRecordIcon
                                                style={{color: (data.itemType === 'veg' || data.itemType === 'Veg') ? 'green' : 'red'}}/>}
                                                             label={data.itemType}/>}
                                        />
                                        <ListItemText
                                            primary={<Chip variant="outlined" color="default" label={"quantity :" + data.itemQuantity}/>}/>
                                        <ListItemSecondaryAction>
                                            <Typography variant="h6"><Icon className="fas fa-rupee-sign"
                                                                           style={{fontSize: 15}}/> {data.itemPrice}
                                            </Typography>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </Grid>
                    <Divider/>
                    <AccordionActions>
                        <Button size="small" color="primary">
                            Order Prepared
                        </Button>
                    </AccordionActions>
                </Accordion>}
        </div>
    );
}