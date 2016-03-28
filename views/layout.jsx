"use strict";

import React from 'react';
import Test from './title.jsx';

export default React.createClass({
	render: function() {
		return(
			<html lang="en">
				<head>
					<meta charSet="utf-8" />
					<meta name="description" content="webkid react starterkit" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<title>webkid react starterkit</title>
					<link rel="stylesheet" href="css/main.css" />
				</head>
				<body>
					<div id="app"></div>
					<Test />
				</body>
			</html>
		);
	}
});