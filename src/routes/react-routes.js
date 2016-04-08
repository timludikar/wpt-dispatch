import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import { App } from '../views/app.jsx';
import { Index } from '../views/index.jsx';
import { About } from '../views/about.jsx';

const reactRoutes = {
	path: '/',
	component: App,
	indexRoute: { component: Index },
	childRoutes: [{
		path: '/about',
		component: About
	}]
};

export default reactRoutes;
