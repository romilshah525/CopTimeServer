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
	policeStationFindOne: PoliceStationTC.getResolver('findOne'),
	policeStationFindById: PoliceStationTC.getResolver('findById'),
	policeStationFindAll: PoliceStationTC.getResolver('findAll'),
	policeStationCount: PoliceStationTC.getResolver('count'),
};

exports.PoliceStationMutation = {
	policeStationCreateOne: PoliceStationTC.getResolver('createOne'),
	policeStationUpdateOne: PoliceStationTC.getResolver('updateOne'),
	policeStationRemoveOne: PoliceStationTC.getResolver('removeOne'),
};
