const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json())

const Order = require('./models/Order');
const Inventory = require('./models/Inventory');

let port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Server is connected.')
});

app.get('/test/', (req, res) => {
    res.send({count: 1})
});

app.post("/orders/", (req, res) => {
	order = new Order(req.body);

	order
		.save()
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json({ message: err });
		});
});

app.get("/orders/", async (req, res) => {
	try {
		const orders = await Order.find();
		res.json(orders);
	} catch (err) {
		res.json(err);
	}
});

app.post("/inventory/", (req, res) => {
	inventory = new Inventory(req.body);

	inventory
		.save()
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json({ message: err });
		});
});

app.get("/inventory/", async (req, res) => {
	try {
		const inventory = await Inventory.find();
		res.json(inventory);
	} catch (err) {
		res.json(err);
	}
});

app.delete('/orders/:id', (req, res) => {
    //
});

app.delete('/items/:id', (req, res) => {
    //
});

const connection = mongoose.connect('mongodb+srv://admin:jakepaul97@supereats.nevls.azure.mongodb.net/supereats?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected!')
);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});