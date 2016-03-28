"use strict";

let context = {};
let renderOpts = {
	runtimeOptions: {
		doctype: '<!DOCTYPE html>',
		renderMethod: 'renderToString'
	}
};

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
}, {
	method: 'GET',
	path: '/react',
	handler: (req, res) => {
		req.render('layout', context, renderOpts, (err, output) => {
			return res(output);
		});
	}
});

export default routes;