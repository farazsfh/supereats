const mongoose = require('mongoose');
var GeoJSON = require("mongoose-geojson-schema");

const LocationSchema = new mongoose.Schema({
	type: String,
	features: Array
});

module.exports = mongoose.model('Location', LocationSchema);