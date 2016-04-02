import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import { App } from '../views/app.jsx';
import { Index } from '../views/components/index.jsx';
import { About } from '../views/components/about.jsx';
import { Locations } from '../views/components/locations.jsx';

const reactRoutes = {
	path: '/',
	component: App,
	indexRoute: { component: Index },
	childRoutes: [{
		path: '/locations',
		component: Locations
	},
	{
		path: '/about',
		component: About
	}]
};

export default reactRoutes;