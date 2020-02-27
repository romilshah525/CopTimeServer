const { User, UserTC } = require('../models/users');

UserTC.addResolver({
	name: 'findAll',
	args: {},
	type: [UserTC],
	resolve: async ({ source, args }) => {
		return await User.find({});
	},
});

exports.UserQuery = {
	userById: UserTC.getResolver('findById'),
	userFindAll: UserTC.getResolver('findAll'),
	userOne: UserTC.getResolver('findOne'),
	userMany: UserTC.getResolver('findMany'),
	userCount: UserTC.getResolver('count'),
};

exports.UserMutation = {
	userCreateOne: UserTC.getResolver('createOne'),
	userUpdateById: UserTC.getResolver('updateById'),
	userUpdateOne: UserTC.getResolver('updateOne'),
};
