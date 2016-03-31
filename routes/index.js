"use strict";

import React from 'react';
import ReactDOMServer, { renderToString } from 'react-dom/server';
import { Layout } from '../views/layout.jsx';
import { About } from '../views/modules/about.jsx';
import { Index } from '../views/modules/index.jsx';

console.log(Index);

import { match, RoutingContext } from 'react-router'

const Immutable = require('immutable');

let isProduction = process.env.NODE_ENV === "production";

const reactroutes = {
	path: '/react',
	component: Layout,
	indexRoute: { component: Index },
	childRoutes: [{
		path: '/react/about',
		component: About
	}]
};

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
			match({ routes: reactroutes, location: req.url.path }, (error, redirectLocation, renderProps) => {
				if(error) res(error.message);
				let routerContext = React.createFactory(RoutingContext);
				res.view('layout', { code: ReactDOMServer.renderToString(routerContext(renderProps))});
			});
	}	
});

export default routes;