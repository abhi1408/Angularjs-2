var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	//category: string,
	name: {type: String, required: true},
	price: {type: Number, required: true},
	image: { type: String },
	description: {type: String, required: true},
	status: Boolean,
});

module.exports = mongoose.model('Product', schema);