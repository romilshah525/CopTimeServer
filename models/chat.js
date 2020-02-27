const { composeWithMongoose } = require('graphql-compose-mongoose');
const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
	{
		senderID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'||'Police',
			required: true
		},
		receiverID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'||'Police',
			required: true
		},
		firID: {
			type: mongoose.Schema.Types.ObjectId,
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
				required: false
			},
			senderID: {
				type: mongoose.Schema.Types.ObjectId,
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

const Chat = mongoose.model('Chat', ChatSchema);

exports.ChatTC = composeWithMongoose(Chat);
exports.ChatSchema = ChatSchema;
exports.Chat = Chat;