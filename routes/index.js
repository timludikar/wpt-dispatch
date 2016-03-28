"use strict";

const routes = [].concat({
	method: 'GET',
	path: '/{param*}',
	handler: {
		directory: {
			path: './dist',
			index: ['index.html']
		}
	}
},{
	method: 'GET',
	path: '/',
	handler: {
		view: 'layout'
	}
});

export default routes;