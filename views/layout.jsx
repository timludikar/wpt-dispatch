import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';

export class Layout extends Component {
	render() {
		return (
			<div>
				<div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
					<header className="mdl-layout__header">
						<div className="mdl-layout__header-row">
							<div className="mdl-layout-spacer"></div>
							<div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
								<label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="fixed-header-drawer-exp">
									<i className="material-icons">search</i>
								</label>
								<div className="mdl-textfield__expandable-holder">
									<input className="mdl-textfield__input" type="text" name="sample" id="fixed-header-drawer-exp" />
								</div>
							</div>
						</div>
					</header>
					<div className="mdl-layout__drawer">
						<span className="mdl-layout-title">{this.props.title}</span>
						<nav className="mdl-navigation">
							<Link className="mdl-navigation__link" to="/react/about">About</Link>
						</nav>
					</div>
					<main className="mdl-layout__content">
						<div className="page-content">{ this.props.children }</div>
					</main>
				</div>
			</div>
		);
	}
}
