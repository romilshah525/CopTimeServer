const { composeWithMongoose } = require('graphql-compose-mongoose');
const mongoose = require('mongoose');

const AadharSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String
		},
		emailID: {
			type: String,
			required: true
		},
		phoneNumber: [{
			number: {
				type: Number,
				required: true
			}
		}],
		aadharNumber: {
			type: String,
			required: true
		},
		address:{
			type:String,
			required:true
		}
	},
);

const Aadhar = mongoose.model('Aadhar', AadharSchema);

exports.AadharTC = composeWithMongoose(Aadhar);
exports.AadharSchema = AadharSchema;
exports.Aadhar = Aadhar;