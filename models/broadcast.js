const { composeWithMongoose } = require('graphql-compose-mongoose');
const mongoose = require('mongoose');

const BroadcastSchema = new mongoose.Schema(
	{
		senderID: {
			type: Schema.Types.ObjectId,
			ref:'Police',
			required: true
		},
		content:{
			type:String,
			required:true
		},
		timeStamp:{
			type:String,
			required:true
		}
	},
);

const Broadcast = mongoose.model('Broadcast', BroadcastSchema);

exports.BroadcastTC = composeWithMongoose(Broadcast);
exports.BroadcastSchema = BroadcastSchema;
exports.Broadcast = Broadcast;