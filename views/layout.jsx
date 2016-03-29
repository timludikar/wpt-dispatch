"use strict";

import React from 'react';
import SideBar from './sidebar.jsx';

export default React.createClass({
	render: function() {
		let drawNav = [{
			id: 1
		}, {
			id: 2
		}, {
			id: 3
		}];

		return(
			<html lang="en">
				<head>
					<meta charSet="utf-8" />
					<meta name="description" content="webkid react starterkit" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<title>webkid react starterkit</title>
					<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
					<link rel="stylesheet" href="https://code.getmdl.io/1.1.3/material.green-blue.min.css" />
					<script defer src="https://code.getmdl.io/1.1.3/material.min.js"></script>
					<script src="/assets/js/bundle.js"></script>
				</head>
				<body>
					<SideBar data={drawNav}/>
				</body>
			</html>
		);
	}
});