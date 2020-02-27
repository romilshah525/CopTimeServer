const { PoliceTC, Police } = require('../models/police');

PoliceTC.addResolver({
	name: 'findAll',
	args: {},
	type: [PoliceTC],
	resolve: async ({ source, args }) => {
		return await Police.find({});
	},
});

exports.PoliceQuery = {
	policeFindOne: PoliceTC.getResolver('findOne'),
	policeFindById: PoliceTC.getResolver('findById'),
	policeFindAll: PoliceTC.getResolver('findAll'),
	policeCount: PoliceTC.getResolver('count'),
};

exports.PoliceMutation = {
	policeCreateOne: PoliceTC.getResolver('createOne'),
	policeUpdateOne: PoliceTC.getResolver('updateOne'),
	policeRemoveOne: PoliceTC.getResolver('removeOne'),
};
