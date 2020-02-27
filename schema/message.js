const { MessageTC } = require('../models/message');

exports.MessageQuery = {
	messageById: MessageTC.getResolver('findById'),
	messageOne: MessageTC.getResolver('findOne'),
	messageCount: MessageTC.getResolver('count'),
};

exports.MessageMutation = {
	messageCreateOne: MessageTC.getResolver('createOne'),
	messageUpdateOne: MessageTC.getResolver('updateOne'),
	messageRemoveOne: MessageTC.getResolver('removeOne'),
};
