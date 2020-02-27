const { BroadcastTC } = require('../models/broadcast');

exports.BroadCastQuery = {
	broadCastById: BroadcastTC.getResolver('findById'),
	broadCastOne: BroadcastTC.getResolver('findOne'),
	broadCastCount: BroadcastTC.getResolver('count'),
};

exports.BroadCastMutation = {
	broadCastCreateOne: BroadcastTC.getResolver('createOne'),
	broadCastUpdateOne: BroadcastTC.getResolver('updateOne'),
	broadCastRemoveOne: BroadcastTC.getResolver('removeOne'),
};
