const { composeWithMongoose } = require('graphql-compose-mongoose');
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
	{
		senderID: {
			type: Schema.Types.ObjectId,
			ref: 'User' || 'Police',
			required: true
		},
		receiverID: {
			type: Schema.Types.ObjectId,
			ref: 'User' || 'Police',
			required: true
		},
		firID: {
			type: Schema.Types.ObjectId,
			ref: 'Case',
			required: true
		},
		content: [{
			text: {
				type: String,
				required: false
			},
			timestamp: {
				type: String,
				required: true
			},
			senderID: {
				type: Schema.Types.ObjectId,
				ref: 'User' || 'Police',
				required: true
			},
			image: {
				type: String,
				required: false,
				default: false
			}
		}]
	},
);

const Message = mongoose.model('Message', MessageSchema);

exports.MessageTC = composeWithMongoose(Message);
exports.MessageSchema = MessageSchema;
exports.Message = Message;