const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	/*category: {
		type: string
	},*/
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	image: {
		type: String
	},
	description: {
		type: String,
		required: true
	},
	status: {
		type: Boolean
	},
});

module.exports = mongoose.model('Product', schema);