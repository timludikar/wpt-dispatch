import React, { Component } from 'react';
import ItemStore from '../../stores/itemStore';
import ItemActions from '../../actions/wptLocationActions';

const LocationList = (props) => {
	return (
		<tr>
			<td className="mdl-data-table__cell--non-numeric">{ props.Label }</td>
		</tr>
	)
}

export class Locations extends Component {

	constructor(props){
		super(props);
		this.state = {
			items : [],
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
		let servers = this.state.items;
		return (
			<div className="mdl-grid">
				<div className="mdl-layout-spacer"></div>
				<div className="mdl-cell mdl-cell--10-col mdl-cell--middle">
					<table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
						<thead>
							<tr>
								<th className="mdl-data-table__cell--non-numeric">Location</th>
							</tr>
						</thead>
						<tbody>
							{ servers.map( server => {
								return <LocationList {...server} />;
							}) }
						</tbody>
					</table>
				</div>
				<div className="mdl-layout-spacer"></div>
			</div>
		);
	}
}