import React, { Component } from 'react';
import { Link } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import RemoteApp from '../reducers/remoteReducer';

let store = createStore(RemoteApp);

if(process.env.BROWSER){
		require('../style/main.less');
}

export class App extends Component {
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
						<span className="mdl-layout-title">WPT Dispatch</span>
						<nav className="mdl-navigation">
							<Link className="mdl-navigation__link" to="/">Home</Link>
							<Link className="mdl-navigation__link" to="/locations">Configuration</Link>
							<Link className="mdl-navigation__link" to="/about">About</Link>
						</nav>
					</div>
					<main className="mdl-layout__content mdl-color--grey-100">
						<Provider store={store}>
							{ this.props.children }
						</Provider>
					</main>
				</div>
			</div>
		);
	}
}
