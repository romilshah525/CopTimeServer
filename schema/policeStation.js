const { PoliceStationTC, PoliceStation } = require('../models/policeStation');

PoliceStationTC.addResolver({
	name: 'findAll',
	args: {},
	type: [PoliceStationTC],
	resolve: async ({ source, args }) => {
		return await PoliceStation.find({});
	},
});

exports.PoliceStationQuery = {
	policeStationById: PoliceStationTC.getResolver('findById'),
	policeStationFindAll: PoliceStationTC.getResolver('findAll'),
	policeStationOne: PoliceStationTC.getResolver('findOne'),
	policeStationCount: PoliceStationTC.getResolver('count'),
};

exports.PoliceStationMutation = {
	policeStationCreateOne: PoliceStationTC.getResolver('createOne'),
	policeStationUpdateOne: PoliceStationTC.getResolver('updateOne'),
	policeStationRemoveOne: PoliceStationTC.getResolver('removeOne'),
};
