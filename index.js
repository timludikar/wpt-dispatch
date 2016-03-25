"use strict";

const Hapi = require('hapi');

let server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: 8000
});

server.register([{
	register: require('inert')
}], (err) => {
	if(err) throw err;

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

	server.start(() => console.log("Server started at: " + server.info.uri));
});