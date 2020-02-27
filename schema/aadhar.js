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
	aadharCardFindOne: AadharTC.getResolver('findOne'),
	aadharCardFindById: AadharTC.getResolver('findById'),
	aadharCardFindAll: AadharTC.getResolver('findAll'),
	aadharCardTotalCount: AadharTC.getResolver('count'),
};

exports.AadharMutation = {
	aadharCardCreateOne: AadharTC.getResolver('createOne'),
	aadharCardUpdateById: AadharTC.getResolver('updateById'),
	aadharCardUpdateOne: AadharTC.getResolver('updateOne'),
};
