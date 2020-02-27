const { UserTC } = require('../models/users');

exports.UserQuery = {
	userById: UserTC.getResolver('findById'),
	userOne: UserTC.getResolver('findOne'),
	userMany: UserTC.getResolver('findMany'),
	userCount: UserTC.getResolver('count'),
};

exports.UserMutation = {
	userCreateOne: UserTC.getResolver('createOne'),
	userUpdateById: UserTC.getResolver('updateById'),
	userUpdateOne: UserTC.getResolver('updateOne'),
};
