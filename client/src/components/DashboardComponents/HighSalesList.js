import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
const axios = require('axios');

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const HighSalesStock = () => {
    const classes = useStyles();

    const [lowStock, setLowStock] = useState([]);
    const [lowProduct, setLowProduct] = useState([]);

    const [highStock, setHighStock] = useState([]);
    const [highProduct, setHighProduct] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/inventory/')
            .then((res) => {
                let items = res.data.slice(0);
                items.sort(function (a, b) {
                    return a.amountSold - b.amountSold;
                });
                setLowStock([items[0].amountSold, items[1].amountSold]);
                setLowProduct([items[0].product, items[1].product]);

                setHighStock([items[items.length - 2].amountSold, items[items.length - 1].amountSold]);
                setHighProduct([items[items.length - 2].product, items[items.length - 1].product]);
                //setLowTwo(items.setLowTwo(items.length - 2));
                console.log(items);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <List className={classes.root}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <TrendingUpIcon></TrendingUpIcon>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={highProduct[1]} secondary={highStock[1]} />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <TrendingUpIcon></TrendingUpIcon>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={highProduct[0]} secondary={highStock[0]} />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <TrendingDownIcon></TrendingDownIcon>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={lowProduct[1]} secondary={lowStock[1]} />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <TrendingDownIcon></TrendingDownIcon>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={lowProduct[0]} secondary={lowStock[0]} />
            </ListItem>
        </List>
    );
};

export default HighSalesStock;
