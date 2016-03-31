"use strict";

import React from 'react';
import ReactDOMServer, { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';

import reactRoutes from './react-routes';

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

const routes = [].concat(staticAssets(), 
	{
		method: 'GET',
		path: '/',
		handler: (req, res) => {
			let layoutOptions = {
				sidebar: {
					title: "WPT Dispatch",
					links: [{
						id: 1,
						title: "Home"
					}]
				}
			};

			let layout = React.createFactory(Layout);
			res.view('layout', { code: ReactDOMServer.renderToString(layout(layoutOptions))});
		}
	}, 
	{
		method: 'GET',
		path: '/react/{param*}',
		handler: (req, res) => {
			match({ routes: reactRoutes, location: req.url.path }, (error, redirectLocation, renderProps) => {
				if(error) res(error.message);
				let routerContext = React.createFactory(RoutingContext);
				res.view('layout', { code: ReactDOMServer.renderToString(routerContext(renderProps))});
			});
	}	
});

export default routes;