const { CaseTC } = require('../models/cases');

exports.CaseQuery = {
	caseFindById: CaseTC.getResolver('findById'),
	caseFindOne: CaseTC.getResolver('findOne'),
	caseCount: CaseTC.getResolver('count'),
};

exports.CaseMutation = {
	caseCreateOne: CaseTC.getResolver('createOne'),
	caseUpdateOne: CaseTC.getResolver('updateOne'),
	caseRemoveOne: CaseTC.getResolver('removeOne'),
};
