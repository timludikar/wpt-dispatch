"use strict";

require('babel-register')();

const Hapi = require('hapi');
const routes = require('./routes').default;
const path = require('path');

let isProduction = process.env.NODE_ENV === "production";
let port = isProduction ? process.env.PORT : 9000;

let server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: port
});

let moduleRegistration = [].concat({ register: require('inert') }, { register: require('vision') })
if(!isProduction){
	moduleRegistration = moduleRegistration.concat({register: require('h2o2')});
}

server.register(moduleRegistration, (err) => {
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