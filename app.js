const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const app = express();

const { schema } = require('./schema');
const port = 4000;

const server = new ApolloServer({
	schema,
	playground: {
		settings: {
			'editor.theme': 'light',
		},
	},
});

server.applyMiddleware({ app });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

// mongoose.Promise = global.Promise;
// mongoose.set('useCreateIndex', true);

const connectToDbAndServerAndGraphQLServer = async function () {
	const connectionDetails = await mongoose.connect("mongodb://localhost/graphqltodo", {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	});
	const portDetails = httpServer.listen(port);
	console.clear();
	console.log(`==> Node Server started at http://localhost:${port}`);
	console.log(`==> GraphQL Server ready at http://localhost:${port}${server.graphqlPath}`);
	console.log(`==> Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`);
	console.log("=========================================================");
}

connectToDbAndServerAndGraphQLServer();

// "C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath "D:\Studies\Projects\Web Development (JS)\GraphQL\todo\todo\src\data"