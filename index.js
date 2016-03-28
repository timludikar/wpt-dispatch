"use strict";

require('babel-register')();

const Hapi = require('hapi');
const routes = require('./routes').default;

let server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: 9000
});

server.register([{
		register: require('inert')
	},
	{
		register: require('vision')
}], (err) => {
	if(err) throw err;

	server.views({
		engines: {
			jsx: require('hapi-react-views')
		},
		relativeTo: __dirname,
		path: 'views'
	});

	server.route(routes);

	server.start(() => console.log("Server started at: " + server.info.uri));
});