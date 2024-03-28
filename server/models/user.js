const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	score: {
		type: Number,
		required: true

	},
	predictions: {
		type: Array,
		required: false
	},
	roles: {
		type: Array,
		required: true
	}
})

module.exports = mongoose.model("User", UserSchema)
