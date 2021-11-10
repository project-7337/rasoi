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
import {Box} from "@material-ui/core";
import OrderTimeline from "./OrderTimeline";

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
}));


export default function SellerData(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            {(props.type === 'menu') ?
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1c-content"
                        id="panel1c-header"
                    >
                        <div className={classes.column}>
                            <Typography className={classes.heading}>{props.sellerName}</Typography>
                        </div>
                        <div className={classes.column}>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography className={classes.heading}>$ {props.amount}</Typography>
                            </Box>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails className={classes.details}>
                        <div className={classes.column}>
                        </div>
                    </AccordionDetails>
                    <Divider/>
                </Accordion>
                : <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1c-content"
                        id="panel1c-header"
                    >
                        <div className={classes.column}>
                            <Typography className={classes.heading}>{props.sellerName}</Typography>
                        </div>
                        <div className={classes.column}>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography className={classes.heading}>$ {props.amount}</Typography>
                            </Box>
                        </div>
                        <div className={classes.column}>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <OrderTimeline/>
                            </Box>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails className={classes.details}>
                        <div className={classes.column}>
                        </div>
                    </AccordionDetails>
                    <Divider/>
                    <AccordionActions>
                        <Button size="small">Deny</Button>
                        <Button size="small" color="primary">
                            Accept
                        </Button>
                    </AccordionActions>
                </Accordion>}
        </div>
    );
}