import { RelayRouter } from 'react-router-relay';
import { Route, IndexRoute } from 'react-router';
import React from 'react';
import { App } from '../views/app.jsx';
import { Index } from '../views/index.jsx';
import { About } from '../views/about.jsx';
import Locations, { LocationRoute } from '../views/locations.jsx';

// const reactRoutes = {
// 	path: '/',
// 	component: App,
// 	indexRoute: { component: Index },
// 	childRoutes: [{
// 		path: '/locations',
//     queries: { viewer: () => Relay.QL`query { locations }`},
// 		component: Locations
// 	}, {
// 		path: '/about',
// 		component: About
// 	}]
// };

export default (
	<Route
		path="/"
		component={App}
	>
		<IndexRoute
			component={Index}
		/>
		<Route
			path="/locations"
			queries={ Relay.QL`query { locations }`}
			component={Locations}
		/>
	</Route>
);
