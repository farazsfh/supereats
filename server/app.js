const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json())

const Order = require('./models/Order');
const Item = require('./models/Item');

let port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Server is connected.')
});

app.post('/orders/add', (req, res) => {
    order = new Order(req.body);

    order.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({message: err});
    })
});

app.post('/items/add', (req, res) => {
    item = new Item(req.body);

    item.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({message: err});
    })
});

app.get('/items', (req, res) => {
    //
});

app.get('/orders', (req, res) => {
    //
});

app.delete('/orders', (req, res) => {
    //
});

app.delete('/items', (req, res) => {
    //
});

const connection = mongoose.connect('mongodb+srv://admin:jakepaul97@supereats.nevls.azure.mongodb.net/supereats?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected!')
);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});