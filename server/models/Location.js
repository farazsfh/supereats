const mongoose = require('mongoose');
var GeoJSON = require("mongoose-geojson-schema");

const LocationSchema = new mongoose.Schema({
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
	featurecollection: mongoose.Schema.Types.FeatureCollection
});

module.exports = mongoose.model('Location', LocationSchema);