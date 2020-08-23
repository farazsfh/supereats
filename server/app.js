const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const Order = require("./models/Order");
const Inventory = require("./models/Inventory");
const Location = require("./models/Location");

let port = process.env.PORT || 5000;

app.get("/locations/", async (req, res) => {
	try {
		const locations = await Location.find();

		var featuresArray = [];

		for (var i = 0; i < locations.length; i++) {
			for (var j = 0; j < locations[i].features.length; j++) {
				featuresArray.push(locations[i].features[j]);
			}
		}

		res.json({type: "FeatureCollection", features: featuresArray});
	} catch (err) {
		res.json(err);
	}
});

app.post("/locations/", (req, res) => {
	var type = req.body.type;
	var geometry = {type: req.body.geometry.type, coordinates: req.body.geometry.coordinates};
	var obj = {type: type, geometry: geometry};
	var featuresArray = [obj];
	location = new Location({type: "FeatureCollection", features: featuresArray})

	location
		.save()
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json({ message: err });
		});
});


app.get("/", (req, res) => {
	res.send("Server is connected.");
});

app.get("/test/", (req, res) => {
	res.send({ count: 1 });
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

app.get("/orders/byId/:id", async (req, res) => {
	try {
		const orders = await Order.findById(req.params.id);
		res.json(orders);
	} catch (err) {
		res.json(err);
	}
});

app.delete("/orders/byId/:id", async (req, res) => {
	try {
		const orders = await Order.findByIdAndDelete(req.params.id);
		res.json(orders);
	} catch (err) {
		res.json(err);
	}
});

app.put("/orders/byId/:id", async (req, res) => {
	try {
		const orders = await Order.findByIdAndUpdate(req.params.id, {
			name: req.body.name,
			address: req.body.address,
			completed: req.body.completed,
		});
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

app.delete("/inventory/byId/:id", async (req, res) => {
	try {
		const inventory = await Inventory.findByIdAndDelete(req.params.id);
		res.json(orders);
	} catch (err) {
		res.json(err);
	}
});

app.get("/inventory/byId/:id", async (req, res) => {
	try {
		const inventory = await Inventory.findOne({ _id: req.params.id });
		res.json(inventory);
	} catch (err) {
		res.json(err);
	}
});

app.put("/inventory/byId/:id", async (req, res) => {
	try {
		const inventory = await Inventory.findByIdAndUpdate(req.params.id, {
			stock: req.body.stock,
			amountSold: req.body.amountSold,
		});
		res.json(orders);
	} catch (err) {
		res.json(err);
	}
});

const connection = mongoose.connect(
	"mongodb+srv://admin:jakepaul97@supereats.nevls.azure.mongodb.net/supereats?retryWrites=true&w=majority",
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log("connected!")
);

app.listen(port, () => {
	console.log(`Server is listening on port ${port}.`);
});
