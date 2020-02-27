const { SchemaComposer } = require('graphql-compose');
const schemaComposer = new SchemaComposer();

const { AadharMutation, AadharQuery } = require('./aadhar');
const { BroadCastSubscription, BroadCastMutation, BroadCastQuery } = require('./broadcast');
const { CaseMutation, CaseQuery } = require('./cases');
const { MessageSubscription, MessageMutation, MessageQuery } = require('./chat');
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
    ...MessageSubscription
});

exports.schema = schemaComposer.buildSchema();