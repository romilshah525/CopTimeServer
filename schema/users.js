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
