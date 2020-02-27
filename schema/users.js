const { PubSub, withFilter } = require('apollo-server-express');
const { BroadcastTC } = require('../models/broadcast');
const mongoose = require('mongoose');

const { MessageTC } = require('../models/message');
const { User, UserTC } = require('../models/users');
const constants = require('../constants');
const pubsub = new PubSub();

UserTC.addResolver({
	name: 'findAll',
	args: {},
	type: [UserTC],
	resolve: async ({ source, args }) => {
		return await User.find({});
	},
});

exports.UserQuery = {
	userFindOne: UserTC.getResolver('findOne'),
	userFindById: UserTC.getResolver('findById'),
	userFindAll: UserTC.getResolver('findAll'),
	userCount: UserTC.getResolver('count'),
};

exports.UserMutation = {
	userCreateOne: UserTC.getResolver('createOne'),
	userUpdateById: UserTC.getResolver('updateById'),
	userUpdateOne: UserTC.getResolver('updateOne'),
};

exports.UserSubscription = {
	newBroadCast: {
		type: MessageTC,
		resolve: (payload, args) => {
			return payload.newlyCreatedBroadCast;
		},
		subscribe: () => pubsub.asyncIterator(constants.LISTENER_FOR_BROADCAST),
	},
};
// exports.BroadCastSubscription = {
// 	newBroadCast: {
// 		type: BroadcastTC,
// 		resolve: (payload, args) => {
// 			return payload.newlyCreatedBroadCast;
// 		},
// 		subscribe: () => pubsub.asyncIterator(constants.LISTENER_FOR_BROADCAST),
// 	},
// };