import React from 'react'
import {makeStyles} from "@material-ui/core/styles"
import {
    Box, Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Divider, FormControl,
    Grid,
    IconButton, Input, InputAdornment, InputLabel, MenuItem, Select, TextField,
    Typography
} from "@material-ui/core"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import SellerData from "./SellerData";
import SellerHeading from "./SellerHeading";

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
        flexGrow: 1
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
}))

export default function Seller() {
    const classes = useStyles()

    const [sellerData, setSellerData] = React.useState([])
    const [open, setOpen] = React.useState(false);

    // add all the values in the single object
    const [values, setValues] = React.useState({
        name: '',
        type: '',
        quantity: 0,
        startTime: '',
        endTime: '',
        amount: ''
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

    }, [])

    const addSellerData = () => {
        setSellerData(sellerData => [...sellerData, values])
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
                        <IconButton color="primary" aria-label="add to shopping cart">
                            <AddCircleOutlineIcon
                                onClick={handleClickOpen}/>
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
                               id="name"
                               label="Enter Name of the Dish"
                               type="text"
                               onChange={onChangeHandler('name')}
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Veg/Non-Veg</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.type}
                            onChange={onChangeHandler('type')}
                        >
                            <MenuItem value="veg">Veg</MenuItem>
                            <MenuItem value="non-veg">Non-Veg</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField className={classes.formControl}
                               autoFocus
                               margin="dense"
                               id="quantity"
                               label="Enter Quantity Present"
                               type="number"
                               onChange={onChangeHandler('quantity')}
                    />
                    <TextField
                        id="time"
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
                        onChange={onChangeHandler('startTime')}
                    />
                    <TextField
                        id="time"
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
                        onChange={onChangeHandler('endTime')}
                    />
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                        <Input
                            id="standard-adornment-amount"
                            value={values.amount}
                            onChange={onChangeHandler('amount')}
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
            <div className={classes.sellerContent}>
                {undefined !== sellerData &&
                sellerData.map((data, index) => (
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                        </Grid>
                        <Grid item xs={6}>
                            <SellerData
                                sellerName={data.name}/>
                        </Grid>
                        <Grid item xs={3}>
                        </Grid>
                    </Grid>
                ))}
            </div>
        </div>
    )
}