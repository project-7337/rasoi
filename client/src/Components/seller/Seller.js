import React from 'react'
import {makeStyles} from "@material-ui/core/styles"
import {Box, Divider, Grid, IconButton, Typography} from "@material-ui/core"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import SellerData from "./SellerData";

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
    }
}))

export default function Seller() {
    const classes = useStyles()

    const [sellerData, setSellerData] = React.useState([])
    const [addedData, setAddedData] = React.useState(0)

    React.useEffect(() => {

    }, [])

    const addSellerData = () => {
        setAddedData(addedData + 1)
        setSellerData(sellerData => [...sellerData, addedData])
    }

    return (
        <div className={classes.root}>
            <Typography component="div" className={classes.align}>
                <Box display="flex" p={1}>
                    <Box p={1} flexGrow={1}>
                        <p className={classes.title}>New Seller, Register Here --></p>
                    </Box>
                    <Box p={1} flexGrow={1}>
                        <IconButton color="primary" aria-label="add to shopping cart">
                            <AddCircleOutlineIcon
                                onClick={addSellerData}/>
                        </IconButton>
                    </Box>
                </Box>
            </Typography>
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
                                    propsData={data}/>
                            </Grid>
                            <Grid item xs={3}>
                            </Grid>
                        </Grid>
                    ))}
            </div>
        </div>
    )
}