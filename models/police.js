const { composeWithMongoose } = require('graphql-compose-mongoose');
const mongoose = require('mongoose');

const PoliceSchema = new mongoose.Schema(
	{
		aadharCardNumber: {
			type: Schema.Types.ObjectId,
			ref: 'Aadhar',
			required: true
		},
		stationAssigned: {
			type: Schema.Types.ObjectId,
			ref: 'PoliceStation',
			required: true
		},
		password: {
			type: String,
			required: true
		},
		casesAssigned: [{
			caseReference: {
				type: Schema.Types.ObjectId,
				ref: 'Case',
				required: true
			},
		}],
		designation: {
			type: String,
			required: true
		}
	},
);

const Police = mongoose.model('Police', PoliceSchema);

exports.PoliceTC = composeWithMongoose(Police);
exports.PoliceSchema = PoliceSchema;
exports.Police = Police;