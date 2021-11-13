import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import {loadCSS} from 'fg-loadcss';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {
    Chip,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,

    },
    media: {
        height: 140,
    },
    chipStyle: {
        padding: theme.spacing(1)
    }
}));

export default function MenuItem(props) {
    const classes = useStyles();

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
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.menuData.itemImage}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.menuData.itemName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <Chip variant="outlined" color="default" label={"quantity :" + props.menuData.itemQuantity}/>
                        <Chip variant="outlined" color="default"
                              icon={<Icon className="fas fa-rupee-sign" style={{fontSize: 15}}/>}
                              label={props.menuData.itemPrice}/>
                        <Chip variant="outlined" color="default" icon={<FiberManualRecordIcon
                            style={{color: (props.menuData.itemType === 'veg' || props.menuData.itemType === 'Veg') ? 'green' : 'red'}}/>}
                              label={props.menuData.itemType}/>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Add to cart
                </Button>
            </CardActions>
        </Card>
    );
}
