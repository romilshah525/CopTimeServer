const { SchemaComposer } = require('graphql-compose');
const schemaComposer = new SchemaComposer();

const { AadharMutation, AadharQuery } = require('./aadhar');
const { BroadCastSubscription, BroadCastMutation, BroadCastQuery } = require('./broadcast');
const { CaseMutation, CaseQuery } = require('./cases');
const { MessageMutation, MessageQuery } = require('./message');
const { PoliceMutation, PoliceQuery } = require('./police');
const { PoliceStationMutation, PoliceStationQuery } = require('./policeStation');
const { UserMutation, UserQuery } = require('./users');

schemaComposer.Query.addFields({
    ...AadharQuery,
    ...BroadCastQuery,
    ...CaseQuery,
    ...MessageQuery,
    ...PoliceQuery,
    ...PoliceStationQuery,
    ...UserQuery,
});

schemaComposer.Mutation.addFields({
    ...AadharMutation,
    ...BroadCastMutation,
    ...CaseMutation,
    ...MessageMutation,
    ...PoliceMutation,
    ...PoliceStationMutation,
    ...UserMutation,
});

schemaComposer.Subscription.addFields({
    ...BroadCastSubscription,
});

exports.schema = schemaComposer.buildSchema();