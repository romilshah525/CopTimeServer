const { PoliceStationTC } = require('../models/policeStation');

exports.PoliceStationQuery = {
	policeStationById: PoliceStationTC.getResolver('findById'),
	policeStationOne: PoliceStationTC.getResolver('findOne'),
	policeStationCount: PoliceStationTC.getResolver('count'),
};

exports.PoliceStationMutation = {
	policeStationCreateOne: PoliceStationTC.getResolver('createOne'),
	policeStationUpdateOne: PoliceStationTC.getResolver('updateOne'),
	policeStationRemoveOne: PoliceStationTC.getResolver('removeOne'),
};
