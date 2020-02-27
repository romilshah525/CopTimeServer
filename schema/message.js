const { PubSub, withFilter } = require('apollo-server-express');
const mongoose = require('mongoose');

const { BroadcastTC } = require('../models/broadcast');
const { MessageTC } = require('../models/message');
const constants = require('../constants');
const pubsub = new PubSub();

exports.MessageQuery = {
	messageFindOne: MessageTC.getResolver('findOne'),
	messageFindById: MessageTC.getResolver('findById'),
	messageCount: MessageTC.getResolver('count'),
};

exports.MessageMutation = {
	messageCreateOne: MessageTC.getResolver('createOne').wrapResolve(next => async rp => {
		let msg = await next(rp);
		pubsub.publish(constants.ANY_MESSAGES_FOR_ME, { newlyCreatedMessage: msg.record, for: msg.record.receiverID });
		return msg;
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
