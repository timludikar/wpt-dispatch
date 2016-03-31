import React from 'react';
import ReactDOM from 'react-dom';
import { match, Router } from 'react-router';
import { createHistory } from 'history';
import routes from './routes/react-routes';

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

match({ routes: routes, location: location }, () => {
	ReactDOM.render( 
		<Router routes={routes} history={createHistory()} />,
    	document.getElementById('app')
    );
});
