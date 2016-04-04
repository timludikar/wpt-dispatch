"use strict";

import React from 'react';
import ReactDOMServer, { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';

import reactRoutes from './react-routes';

import { graphql } from 'graphql';
import { locationSchema } from '../../models/location';

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
			path: '/assets/{param*}',
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
		path: '/{param*}',
		handler: (req, res) => {
			match({ routes: reactRoutes, location: req.url.path }, (error, redirectLocation, renderProps) => {
				if(error) res(error.message);
				let routerContext = React.createFactory(RoutingContext);
				res.view('layout', { code: ReactDOMServer.renderToString(routerContext(renderProps))});
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
			graphql(locationSchema, req.payload).then(result => {
			  res(result);
			});
		}
	}
);

export default routes;