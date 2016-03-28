"use strict";

const Immutable = require('immutable');
let isProduction = process.env.NODE_ENV === "production";

const staticAssets = () => {
	let options = Immutable.List.of({ 
			method: 'GET',
			path: '/assets/{param*}',
			handler: {
				directory: {
					path: './build',
					index: ['index.html']
				}
			}
		});

	if(!isProduction){
		return options.clear().push({
			method: 'GET',
			path: '/{param*}',
			handler: {
				proxy: {
					host: 'localhost',
					port: '8080'
				}
			}
		}).toArray();
	}

	return options.toArray();
}

let context = {};
let renderOpts = {
	runtimeOptions: {
		doctype: '<!DOCTYPE html>',
		renderMethod: 'renderToString'
	}
};

const routes = [].concat(staticAssets() ,{
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