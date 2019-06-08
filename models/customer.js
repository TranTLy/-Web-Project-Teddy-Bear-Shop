var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var CustomerSchema = new Schema(
	{
		name: {
			type: String
		},
		birthday: {
			type: Date
		},
		email: {
			type: String
		},
		password: {
			type: String
		},
		phoneNumber: {
			type: String
		},
		gender: {
			type: String
		}
	},
	{ collection: 'customers' }
);

module.exports = mongoose.model('Customer', CustomerSchema);