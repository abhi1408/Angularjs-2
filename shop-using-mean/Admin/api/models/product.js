var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
	//category: string,
	name: String,
	price: Number,
	status: Boolean,
	//image: string,
	//description: string
});

var productModel = mongoose.model('Products', ProductSchema);

module.exports = productModel;