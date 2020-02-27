const { composeWithMongoose } = require('graphql-compose-mongoose');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		aadharCardNumber: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Aadhar',
			required: true
		},
		password: {
			type: String,
			required: true
		},
		homeLocation: {
			latitude: {
				type: String,
				required: true
			},
			longitude: {
				type: String,
				required: true
			}
		},
		policeStation: {
			type: String,
			required: true
		},
		isVolunteer: {
			type: Boolean,
			required: true,
			default: false
		}
	},
);

const User = mongoose.model('User', UserSchema);

exports.UserTC = composeWithMongoose(User);
exports.UserSchema = UserSchema;
exports.User = User;