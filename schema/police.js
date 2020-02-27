const { PoliceTC } = require('../models/police');

exports.PoliceQuery = {
	policeById: PoliceTC.getResolver('findById'),
	policeOne: PoliceTC.getResolver('findOne'),
	policeCount: PoliceTC.getResolver('count'),
};

exports.PoliceMutation = {
	policeCreateOne: PoliceTC.getResolver('createOne'),
	policeUpdateOne: PoliceTC.getResolver('updateOne'),
	policeRemoveOne: PoliceTC.getResolver('removeOne'),
};
