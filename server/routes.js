"use strict";

import React from 'react';
import ReactDOMServer, { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';

import reactRoutes from '../webapp/routes/react-routes';

import { graphql } from 'graphql';
import { configSchema } from '../schema/configuration';

const Immutable = require('immutable');

let isProduction = process.env.NODE_ENV === "production";

const staticAssets = () => {
	let options = Immutable.List.of({
			method: 'GET',
			path: '/assets/js/{param*}',
			handler: {
				directory: {
					path: '../public',
					index: ['index.html']
				}
			}
		});

	if(!isProduction){
		return options.clear().push({
			method: 'GET',
			path: '/assets/{param*}',
			handler: {
				proxy: {
					host: 'localhost',
					port: '8080'
				}
			}
		}).push({
			method: 'GET',
			path: '/graphiql/{param*}',
			handler: {
				directory: {
					path: './graphiql',
					redirectToSlash: true,
            		index: true
				}
			}
		}).toArray();
	}

	return options.toArray();
}

const routes = [].concat(staticAssets(),
	{
		method: 'GET',
		path: '/{param*}',
		handler: (req, res) => {

			if(req.url.pathname === "/favicon.ico"){
				return res("Does not exist yet").code(404);
			}

			match({ routes: reactRoutes, location: req.url.path }, (error, redirectLocation, renderProps) => {
				if(error) res(error.message);
				let routerContext = React.createFactory(RoutingContext);
				return res.view('layout', { code: ReactDOMServer.renderToString(routerContext(renderProps))});
			});
		}
	},
	{
		method: 'POST',
		path: '/graphql',
		config: {
			payload: {
				output: 'data',
				parse: true
			}
		},
		handler: (req, res) => {
			graphql(configSchema, req.payload.query).then(result => {
			  return res(result);
			});
		}
	}
);

export default routes;
