const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

var GeoJSON = require("mongoose-geojson-schema");
var mongoose = require("mongoose");

var schema = new mongoose.Schema({
	any: mongoose.Schema.Types.GeoJSON,
	point: mongoose.Schema.Types.Point,
	multipoint: mongoose.Schema.Types.MultiPoint,
	linestring: mongoose.Schema.Types.LineString,
	multilinestring: mongoose.Schema.Types.MultiLineString,
	polygon: mongoose.Schema.Types.Polygon,
	multipolygon: mongoose.Schema.Types.MultiPolygon,
	geometry: mongoose.Schema.Types.Geometry,
	geometrycollection: mongoose.Schema.Types.GeometryCollection,
	feature: mongoose.Schema.Types.Feature,
	featurecollection: mongoose.Schema.Types.FeatureCollection,
});

var db = mongoose.createConnection("localhost", "test");
var Location = db.model("GeoJSON", schema);

app.get("/locations/", async (req, res) => {
	try {
		const locations = await Location.find();
		res.json(locations);
	} catch (err) {
		res.json(err);
	}
});

app.post("/locations/", (req, res) => {
	const location = new Location({
		any: {
			type: "Point",
			coordinates: [-113.806458, 44.847784],
		},
		point: {
			type: "Point",
			coordinates: [12.123456, 13.134578],
		},
	});

	location
		.save()
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json({ message: err });
		});
});

const Order = require("./models/Order");
const Inventory = require("./models/Inventory");

let port = process.env.PORT || 5000;

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
