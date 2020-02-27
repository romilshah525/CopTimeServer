const { CaseTC } = require('../models/cases');

exports.CaseQuery = {
	caseById: CaseTC.getResolver('findById'),
	caseOne: CaseTC.getResolver('findOne'),
	caseCount: CaseTC.getResolver('count'),
};

exports.CaseMutation = {
	caseCreateOne: CaseTC.getResolver('createOne'),
	caseUpdateOne: CaseTC.getResolver('updateOne'),
	caseRemoveOne: CaseTC.getResolver('removeOne'),
};
