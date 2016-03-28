"use strict";

let isProduction = process.env.NODE_ENV === "production";
let staticAssets = {
	method: 'GET',
	path: '/assets/{param*}',
	handler: {
		directory: {
			path: './build',
			index: ['index.html']
		}
	}
};

let context = {};
let renderOpts = {
	runtimeOptions: {
		doctype: '<!DOCTYPE html>',
		renderMethod: 'renderToString'
	}
};

if(!isProduction) {
	staticAssets = {
		method: 'GET',
		path: '/{param*}',
		handler: {
			proxy: {
				host: 'localhost',
				port: '8080'
			}
		}
	}
}

const routes = [].concat(staticAssets ,{
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