const { Aadhar, AadharTC } = require('../models/aadhar');

AadharTC.addResolver({
	name: 'findAll',
	args: {},
	type: [AadharTC],
	resolve: async ({ source, args }) => {
		return await Aadhar.find({});
	},
});

exports.AadharQuery = {
	aadharFindAll: AadharTC.getResolver('findAll'),
	aadharById: AadharTC.getResolver('findById'),
	aadharOne: AadharTC.getResolver('findOne'),
	aadharMany: AadharTC.getResolver('findMany'),
	aadharCount: AadharTC.getResolver('count'),
};

exports.AadharMutation = {
	aadharCreateOne: AadharTC.getResolver('createOne'),
	aadharUpdateById: AadharTC.getResolver('updateById'),
	aadharUpdateOne: AadharTC.getResolver('updateOne'),
};
