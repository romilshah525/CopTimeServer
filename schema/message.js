const { MessageTC } = require('../models/message');

exports.MessageQuery = {
	messageFindOne: MessageTC.getResolver('findOne'),
	messageFindById: MessageTC.getResolver('findById'),
	messageCount: MessageTC.getResolver('count'),
};

exports.MessageMutation = {
	messageCreateOne: MessageTC.getResolver('createOne'),
	messageUpdateOne: MessageTC.getResolver('updateOne'),
	messageRemoveOne: MessageTC.getResolver('removeOne'),
};
