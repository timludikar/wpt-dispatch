"use strict";

require('babel-register')();

const Hapi = require('hapi');

let server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: 8000
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

	server.route({
		method: 'GET',
		path: '/{param*}',
		handler: {
			directory: {
				path: './dist',
				index: ['index.html']
			}
		}
	});

	server.route({
		method: 'GET',
		path: '/',
		handler: {
			view: 'layout'
		}
	});

	server.start(() => console.log("Server started at: " + server.info.uri));
});