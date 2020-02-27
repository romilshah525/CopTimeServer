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
	policeById: PoliceTC.getResolver('findById'),
	policeFindAll: PoliceTC.getResolver('findAll'),
	policeOne: PoliceTC.getResolver('findOne'),
	policeCount: PoliceTC.getResolver('count'),
};

exports.PoliceMutation = {
	policeCreateOne: PoliceTC.getResolver('createOne'),
	policeUpdateOne: PoliceTC.getResolver('updateOne'),
	policeRemoveOne: PoliceTC.getResolver('removeOne'),
};
