import React, { Component } from 'react';
import ItemStore from '../../stores/itemStore';
import ItemActions from '../../actions/wptLocationActions';

const LocationList = (props) => {
	return (
		<li className="mdl-list__item">
			<span className="mdl-list__item-primary-content">
				<i className="material-icons  mdl-list__item-avatar">person</i>
				{props.Label}
			</span>
			<span className="mdl-list__item-secondary-action">
			<label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="list-checkbox-1">
				<input type="checkbox" id="list-checkbox-1" className="mdl-checkbox__input"/>
			</label>
			</span>
		</li>
	)
}

export class Locations extends Component {

	constructor(props){
		super(props);
		this.state = {
			items : {
				location: []
			},
			loading: false
		};
	}

	componentDidMount() {
		this.unsubscribe = ItemStore.listen(this.onStatusChange.bind(this));
		ItemActions.loadItems();
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	onStatusChange(state) {
		this.setState(state);
	}

	render() {
		let servers = this.state.items.location;
		return (
			<ul className="mdl-list">
				{	servers.map((local,i) => {
					return <LocationList key={i} {...local} />
				})}
			</ul>
		);
	}
}