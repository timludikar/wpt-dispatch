import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import { Layout } from '../views/layout.jsx';
import { Index } from '../views/modules/index.jsx';
import { About } from '../views/modules/about.jsx';

const reactRoutes = {
	path: '/react',
	component: Layout,
	indexRoute: { component: Index },
	childRoutes: [{
		path: '/react/about',
		component: About
	}]
};

export default reactRoutes;