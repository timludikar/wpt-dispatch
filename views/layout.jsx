import React, { Component } from 'react';
import { Sidebar } from './sidebar.jsx';

export class Layout extends Component {
	render() {
		return (
			<div id="app">
				<Sidebar />
			</div>
		);
	}
}
