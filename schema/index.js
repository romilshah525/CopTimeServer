const { SchemaComposer } = require('graphql-compose');
const schemaComposer = new SchemaComposer();

const { TaskQuery, TaskMutation, TaskSubscription } = require('./task');
const { TaskTC } = require('../models/aadhar');

schemaComposer.Query.addFields({
    ...TaskQuery,
    
});

schemaComposer.Mutation.addFields({
    ...TaskMutation,
    
});

schemaComposer.Subscription.addFields({
    ...TaskSubscription,
});

exports.schema = schemaComposer.buildSchema();