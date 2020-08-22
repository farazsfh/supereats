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

app.post("/items/", (req, res) => {
	item = new Item(req.body);

	order
		.save()
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json({ message: err });
		});
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