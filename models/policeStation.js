const { composeWithMongoose } = require('graphql-compose-mongoose');
const mongoose = require('mongoose');

const PoliceStationSchema = new mongoose.Schema(
	{
		// inspector: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'Police',
		// 	required: true
		// },
		stationID: {
			type: String,
			required: true
		},
		// team: [{
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'Police',
		// 	required: true
		// }]
	},
);

const PoliceStation = mongoose.model('PoliceStation', PoliceStationSchema);

exports.PoliceStationTC = composeWithMongoose(PoliceStation);
exports.PoliceStationSchema = PoliceStationSchema;
exports.PoliceStation = PoliceStation;