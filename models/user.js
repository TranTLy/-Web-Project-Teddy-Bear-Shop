var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var UserSchema = new Schema(
	{
		name: {
			type: String
		},
		email: {
			type: String
		},
		password: {
			type: String
		}
	},
	{ collection: 'admins' }
);

module.exports = mongoose.model('User', UserSchema);
