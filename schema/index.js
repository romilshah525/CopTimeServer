const { SchemaComposer } = require('graphql-compose');
const schemaComposer = new SchemaComposer();

const { AadharMutation, AadharQuery } = require('./aadhar');
const { BroadCastSubscription, BroadCastMutation, BroadCastQuery } = require('./broadcast');
const { CaseMutation, CaseQuery } = require('./cases');
const { ChatMutation,ChatSubscription,ChatQuery } = require('./chat');
const { PoliceMutation, PoliceQuery } = require('./police');
const { PoliceStationMutation, PoliceStationQuery } = require('./policeStation');
const { UserMutation, UserQuery } = require('./users');

schemaComposer.Query.addFields({
    ...AadharQuery,
    ...BroadCastQuery,
    ...CaseQuery,
    ...ChatQuery,
    ...PoliceQuery,
    ...PoliceStationQuery,
    ...UserQuery,
});

schemaComposer.Mutation.addFields({
    ...AadharMutation,
    ...BroadCastMutation,
    ...CaseMutation,
    ...ChatMutation,
    ...PoliceMutation,
    ...PoliceStationMutation,
    ...UserMutation,
});

schemaComposer.Subscription.addFields({
    ...BroadCastSubscription,
    ...ChatSubscription
});

exports.schema = schemaComposer.buildSchema();