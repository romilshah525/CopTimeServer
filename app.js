const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const app = express();

const { schema } = require('./schema');
const { PORT } = require('./constants');

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
	const connectionDetails = await mongoose.connect("mongodb://localhost/coptime", {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	});
	const PORTDetails = httpServer.listen(PORT);
	console.clear();
	console.log(`==> Node Server started at http://localhost:${PORT}`);
	console.log(`==> GraphQL Server ready at http://localhost:${PORT}${server.graphqlPath}`);
	console.log(`==> Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
	console.log("=========================================================");
}

connectToDbAndServerAndGraphQLServer();

// yarn run db
// yarn run start
// "C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath "D:\Studies\Projects\Web Development (JS)\GraphQL\CopTimeServer\data"