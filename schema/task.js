const { Task, TaskTC } = require('../models/aadhar');
const { PubSub } = require('apollo-server-express');
const pubsub = new PubSub();
const POST_ADDED = 'POST_ADDED';

exports.TaskSubscription = {
    newTaskInserted: {
        type: TaskTC,
        resolve: (payload, args) => {
            return payload.newCreatedTask;
        },
        subscribe: () => pubsub.asyncIterator(POST_ADDED),
    },
};

exports.TaskQuery = {
    taskById: TaskTC.getResolver('findById'),
    taskByIds: TaskTC.getResolver('findByIds'),
    taskOne: TaskTC.getResolver('findOne'),
    taskMany: TaskTC.getResolver('findMany'),
    taskCount: TaskTC.getResolver('count'),
    taskConnection: TaskTC.getResolver('connection'),
    taskPagination: TaskTC.getResolver('pagination')
};

exports.TaskMutation = {
    taskCreateOne: TaskTC.getResolver('createOne').wrapResolve(next => async rp => {
        let t = await next(rp);
        pubsub.publish(POST_ADDED, { newCreatedTask: t.record });
        return t;
    }),
    taskCreateMany: TaskTC.getResolver('createMany'),
    taskUpdateById: TaskTC.getResolver('updateById'),
    taskUpdateOne: TaskTC.getResolver('updateOne'),
    taskUpdateMany: TaskTC.getResolver('updateMany'),
    taskRemoveById: TaskTC.getResolver('removeById'),
    taskRemoveOne: TaskTC.getResolver('removeOne'),
    taskRemoveMany: TaskTC.getResolver('removeMany')
};
