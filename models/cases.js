const { composeWithMongoose } = require('graphql-compose-mongoose');
const mongoose = require('mongoose');

const CaseSchema = new mongoose.Schema(
	{
		firID: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		images: [{
			type: String,
			required: false
		}],
		reportedBy: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		reportedAt: {
			type: Schema.Types.ObjectId,
			ref: 'PoliceStation',
			required: true,
		},
		assignedTo: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Police',
			default: null
		},
		status: {
			type: String,
			required: true,
			default: 'Not Assigned'
		}
	},
);

const Case = mongoose.model('Case', CaseSchema);

exports.CaseTC = composeWithMongoose(Case);
exports.CaseSchema = CaseSchema;
exports.Case = Case;