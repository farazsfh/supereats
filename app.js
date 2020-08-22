const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json())

const Order = require('./models/Order');

let port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Server is connected.')
});

app.post('/orders/add', (req, res) => {
    const order = new Order({
        name: req.body.name,
        address: req.body.address,
        items: [item1, item2]
    })

    order.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({message: err});
    })
});

mongoose.connect('mongodb+srv://admin:jakepaul97@supereats.nevls.azure.mongodb.net/supereats?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected!')
);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});