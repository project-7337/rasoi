import React from 'react'
import {makeStyles} from "@material-ui/core/styles"
import {
    Box, Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Divider, FormControl,
    Grid,
    IconButton, Input, InputAdornment, InputLabel, MenuItem, Select, Tab, Tabs, TextField,
    Typography
} from "@material-ui/core"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import SellerData from "./SellerData";
import SellerHeading from "./SellerHeading";
import PropTypes from 'prop-types';
import axios from "axios";

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
    },
    sellerContent: {
        flexGrow: 1,
        width: '100%'
    },
    formControl: {
        margin: theme.spacing(1),
        width: '100%'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    tabRoot: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    }
}))

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            style={{width: '100%'}}
        >
            {value === index && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function Seller() {
    const classes = useStyles()

    const [sellerData, setSellerData] = React.useState({
        menu: []
    })
    const [bookingsData, setBookingsData] = React.useState({
        bookings: []
    })
    const [open, setOpen] = React.useState(false);

    const [tabValue, setTabValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // add all the values in the single object
    const [values, setValues] = React.useState({
        itemName: '',
        itemType: '',
        itemQuantity: 0,
        itemStartTime: '',
        itemEndTime: '',
        itemPrice: 0
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (prop) => (event) => {
        if (prop === 'add')
            addSellerData()
        setOpen(false);
    };

    const onChangeHandler = (props) => (event) => {
        setValues({
            ...values,
            [props]: event.target.value
        })
    }

    React.useEffect(() => {
        async function fetchBookings() {
            const response = await axios.get("/api/v1/fetchBookings")
            console.log(response)
            setBookingsData((bookingsData) => ({...bookingsData, bookings: response.data}))
        }

        async function fetchDishes() {
            const response = await axios.get("/api/v1/fetchDishes")
            console.log(response)
            setSellerData(sellerData => ({...sellerData, menu: response.data}))
        }

        fetchDishes()
        fetchBookings()
    }, [])

    const addSellerData = () => {
        let oldData = sellerData.menu
        oldData.push(values)
        setSellerData(sellerData => ({...sellerData, menu: oldData}))
    }

    return (
        <div className={classes.root}>
            <SellerHeading/>
            <Typography component="div" className={classes.align}>
                <Box display="flex" p={1}>
                    <Box p={1} flexGrow={1}>
                        <Typography gutterBottom variant="h5">
                            Add New Dishes for Today
                        </Typography>
                    </Box>
                    <Box p={1} flexGrow={1}>
                        <IconButton color="primary" aria-label="add to shopping cart" onClick={handleClickOpen}>
                            <AddCircleOutlineIcon/>
                        </IconButton>
                    </Box>
                </Box>
            </Typography>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Dish</DialogTitle>
                <DialogContent>
                    <TextField className={classes.formControl}
                               autoFocus
                               margin="dense"
                               id="itemName"
                               label="Enter Name of the Dish"
                               type="text"
                               onChange={onChangeHandler('itemName')}
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Veg/Non-Veg</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.itemType}
                            onChange={onChangeHandler('itemType')}
                        >
                            <MenuItem value="veg">Veg</MenuItem>
                            <MenuItem value="non-veg">Non-Veg</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField className={classes.formControl}
                               autoFocus
                               margin="dense"
                               id="itemQuantity"
                               label="Enter Quantity Present"
                               type="number"
                               onChange={onChangeHandler('itemQuantity')}
                    />
                    <TextField
                        id="itemStartTime"
                        label="Dish Time (Start)"
                        type="time"
                        defaultValue="10:30"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                        onChange={onChangeHandler('itemStartTime')}
                    />
                    <TextField
                        id="itemEndTime"
                        label="Dish Time (End)"
                        type="time"
                        defaultValue="16:30"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                        onChange={onChangeHandler('itemEndTime')}
                    />
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                        <Input
                            id="standard-adornment-amount"
                            value={values.itemPrice}
                            onChange={onChangeHandler('itemPrice')}
                            type="number"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose('cancel')} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose('add')} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            <Divider className={classes.divider}>
            </Divider>
            <div className={classes.tabRoot}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={tabValue}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="Today's Menu" {...a11yProps(0)} />
                    <Tab label="Today's Bookings" {...a11yProps(1)} />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                    {
                        undefined !== sellerData && sellerData.menu.map((data, index) => (
                            <Grid container spacing={3} key={index}>
                                <Grid item xs={12}>
                                    <SellerData
                                        type={'menu'}
                                        sellerName={data.itemName}
                                        amount={data.itemPrice}
                                    />
                                </Grid>
                            </Grid>
                        ))
                    }
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    {undefined !== bookingsData &&
                    bookingsData.bookings.map((data, index) => (
                        <Grid container spacing={3} key={index}>
                            <Grid item xs={12}>
                                <SellerData
                                    type={'booking'}
                                    bookingName={data.bookingName}
                                    bookingAmount={data.bookingAmount}
                                    bookingItems={data.bookingItems}
                                />
                            </Grid>
                        </Grid>
                    ))
                    }
                </TabPanel>
            </div>
        </div>
    )
}
