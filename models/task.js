const { composeWithMongoose } = require('graphql-compose-mongoose');
const timestamps = require('mongoose-timestamp');
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
	{
		task: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
);

TaskSchema.plugin(timestamps);
TaskSchema.index({ createdAt: 1, updatedAt: 1 });
const Task = mongoose.model('Task', TaskSchema);

exports.TaskTC = composeWithMongoose(Task);
exports.TaskSchema = TaskSchema;
exports.Task = Task;