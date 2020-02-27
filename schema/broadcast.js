const { BroadcastTC } = require('../models/broadcast');
const { PubSub } = require('apollo-server-express');

const constants = require('../constants');
const pubsub = new PubSub();

exports.BroadCastQuery = {
	broadCastFindById: BroadcastTC.getResolver('findById'),
	broadCastFindOne: BroadcastTC.getResolver('findOne'),
	broadCastCount: BroadcastTC.getResolver('count'),
};

exports.BroadCastMutation = {
	broadCastCreateOne: BroadcastTC.getResolver('createOne').wrapResolve(next => async rp => {
		let broadcast = await next(rp);
		pubsub.publish(constants.LISTENER_FOR_BROADCAST, { newlyCreatedBroadCast: broadcast.record });
		return broadcast;
	}),
	broadCastUpdateOne: BroadcastTC.getResolver('updateOne'),
	broadCastRemoveOne: BroadcastTC.getResolver('removeOne'),
};

exports.BroadCastSubscription = {
	newBroadCast: {
		type: BroadcastTC,
		resolve: (payload, args) => {
			return payload.newlyCreatedBroadCast;
		},
		subscribe: () => pubsub.asyncIterator(constants.LISTENER_FOR_BROADCAST),
	},
};