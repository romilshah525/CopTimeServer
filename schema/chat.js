const { PubSub, withFilter } = require('apollo-server-express');
const mongoose = require('mongoose');

const { Chat, ChatTC } = require('../models/chat');
const constants = require('../constants');
const pubsub = new PubSub();

exports.ChatQuery = {
	chatFindOne: ChatTC.getResolver('findOne'),
	chatFindById: ChatTC.getResolver('findById'),
	chatCount: ChatTC.getResolver('count'),
};

exports.ChatMutation = {
	chatCreateOne: ChatTC.getResolver('createOne').wrapResolve(next => async rp => {
		let message = await Chat.findOne({ firID: rp.args.record.firID });
		let msg;
		if (message) {
			let content = {
				text: rp.args.record.content[0].text,
				timestamp: rp.args.record.content[0].timestamp,
				senderID: mongoose.Types.ObjectId(rp.args.record.content[0].senderID),
			}
			message.content = [...message.content, content];
			msg = await message.save();
			let msgToBeReturned = {
				'recordId': msg._id,
				'record': msg
			}
			pubsub.publish(constants.ANY_MESSAGES_FOR_ME, { newlyCreatedMessage: rp.args.record, for: rp.args.record.receiverID });
			return msgToBeReturned;
		}
		else {
			msg = await next(rp);
			pubsub.publish(constants.ANY_MESSAGES_FOR_ME, { newlyCreatedMessage: rp.args.record, for: rp.args.record.receiverID });
			return msg;
		}
	})
};

exports.ChatSubscription = {
	subscribeToChats: {
		type: ChatTC,
		args: { myself: 'String' },
		resolve: (payload, args) => {
			return payload.newlyCreatedMessage;
		},
		subscribe: withFilter(
			() => pubsub.asyncIterator(constants.ANY_MESSAGES_FOR_ME),
			(payload, args) => {
				return payload.for.toString() == args.myself
			},
		),
	},
};
