const { MessageTC } = require('../models/message');
const { PubSub } = require('apollo-server-express');

const constants = require('../constants');
const pubsub = new PubSub();

exports.MessageQuery = {
	messageFindOne: MessageTC.getResolver('findOne'),
	messageFindById: MessageTC.getResolver('findById'),
	messageCount: MessageTC.getResolver('count'),
};

exports.MessageMutation = {
	messageCreateOne: MessageTC.getResolver('createOne').wrapResolve(next => async rp => {
		let broadcast = await next(rp);
		pubsub.publish(constants.LISTENER_FOR_BROADCAST, { newlyCreatedBroadCast: broadcast.record });
		return broadcast;
	}),
	messageUpdateOne: MessageTC.getResolver('updateOne'),
	messageRemoveOne: MessageTC.getResolver('removeOne'),
};
