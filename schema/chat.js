const { PubSub, withFilter } = require('apollo-server-express');
const mongoose = require('mongoose');

const { Chat,ChatTC } = require('../models/chat');
const constants = require('../constants');
const pubsub = new PubSub();

exports.ChatQuery = {
	chatFindOne: ChatTC.getResolver('findOne'),
	chatFindById: ChatTC.getResolver('findById'),
	chatCount: ChatTC.getResolver('count'),
};

exports.ChatMutation = {
	chatCreateOne: ChatTC.getResolver('createOne').wrapResolve(next => async rp => {
		let messages = await Chat.findOne({ firID: rp.args.record.firID }, async function (err, doc) {
			if (doc) {
				let content = {
					text: rp.args.record.content[0].text,
					timestamp: rp.args.record.content[0].timestamp,
					senderID: mongoose.Types.ObjectId(rp.args.record.content[0].senderID),
				}
				doc.content = [...doc.content, content];
				let msg = await doc.save();
				return msg;
			} else {
				let msg = await next(rp);
				return msg;
			}
		});
		pubsub.publish(constants.ANY_MESSAGES_FOR_ME, { newlyCreatedMessage: rp.args.record, for: rp.args.record.receiverID });
		return messages;
	}),
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
