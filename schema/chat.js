const { PubSub, withFilter } = require('apollo-server-express');
const mongoose = require('mongoose');

const { BroadcastTC } = require('../models/broadcast');
const { Message, MessageTC } = require('../models/chat');
const constants = require('../constants');
const pubsub = new PubSub();

exports.MessageQuery = {
	messageFindOne: MessageTC.getResolver('findOne'),
	messageFindById: MessageTC.getResolver('findById'),
	messageCount: MessageTC.getResolver('count'),
};

exports.MessageMutation = {
	messageCreateOne: MessageTC.getResolver('createOne').wrapResolve(next => async rp => {
		let messages = await Message.findOne({ firID: rp.args.record.firID }, async function (err, doc) {
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
	messageUpdateOne: MessageTC.getResolver('updateOne'),
	messageRemoveOne: MessageTC.getResolver('removeOne'),
};

exports.MessageSubscription = {
	subscribeToMessages: {
		type: MessageTC,
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
