"use strict";

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Layout } from '../views/layout.jsx';

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

const routes = [].concat(staticAssets() ,{
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
});

export default routes;