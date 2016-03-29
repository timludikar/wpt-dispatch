"use strict";

const React = require('react');

// <a className="mdl-navigation__link" href="">Link</a>
// <a className="mdl-navigation__link" href="">Link</a>
// <a className="mdl-navigation__link" href="">Link</a>
// <a className="mdl-navigation__link" href="">Link</a>

let drawNavigation = React.createClass({
	render: () => {
		return <a className="mdl-navigation__link" href="">Link</a>
	}
});


export default React.createClass({
	render: () => {
		console.log(this);
		return (
			<div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
				<header className="mdl-layout__header">
					<div className="mdl-layout__header-row">
						<span className="mdl-layout-title">WebPageTest Dispatch</span>
						<div className="mdl-layout-spacer"></div>
						<nav className="mdl-navigation mdl-layout--large-screen-only">
							<a className="mdl-navigation__link" href="">Link</a>
							<a className="mdl-navigation__link" href="">Link</a>
							<a className="mdl-navigation__link" href="">Link</a>
							<a className="mdl-navigation__link" href="">Link</a>
						</nav>
					</div>
				</header>
				<div className="mdl-layout__drawer">
					<span className="mdl-layout-title">Title</span>
					<nav className="mdl-navigation">
					</nav>
				</div>
				<main className="mdl-layout__content">
					<div className="page-content">Content Goes Here</div>
				</main>
			</div>
		)
	}
});