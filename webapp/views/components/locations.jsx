import React, { Component } from 'react';
import {Card, CardTitle, CardText, Icon, Button, Checkbox, Textfield, IconButton, Menu, MenuItem} from 'react-mdl';
import { Section } from './section.jsx';
import ExtendedList from './extendedlist.jsx';
import fetch from 'isomorphic-fetch';

export class Locations extends Component {
	constructor(props){
		super(props);
		this.state = {
			editable: false,
			remotes: props.remotes
		};
		this.toggleEditRemote = this.toggleEditRemote.bind(this);
		this.itemAdd = this.itemAdd.bind(this);
		this.itemRemove = this.itemRemove.bind(this);
	}

	componentDidMount() {
		this.fetchRemote();
	}

	fetchRemote(){
		let data = new FormData();
		data.append('query', '{locations{ id, label, url }}');

		fetch('/graphql', {
			method: 'POST',
			body: data
		}).then(response => response.json()).then(res => res.data).then(data => {
			this.setState({
				remotes: data.locations
			});
		});
	}

	toggleEditRemote(e){
		this.setState({
			editable: !this.state.editable
		});
	}

	itemRemove(e){
		let data = new FormData();
		data.append('query', 'mutation { removeHost(id: "' + e + '")}');

		fetch('/graphql', {
			method: 'POST',
			body: data
		}).then(response => response.json()).then(res => res.data).then(data => {
			this.fetchRemote();
		});
	}

	itemAdd(e) {
		let data = new FormData();
		data.append('query', 'mutation { createHost(label: "' + e.label + '" url: "' + e.url + '"){ label url }}');

		fetch('/graphql', {
			method: 'POST',
			body: data
		}).then(response => response.json()).then(res => res.data).then(data => {
			this.fetchRemote();
		});
	}

	render() {
		return (
			<div>
			<Section>
				<Card className="mdl-cell mdl-cell--10-col" shadow={0} style={{'width': '100%'}}>
					<CardText style={{'width':'750px', 'margin':'auto'}}>
						<h4>WebPageTest Hosts</h4>
						<ExtendedList {...this.state} onItemRemove={this.itemRemove} onItemAdd={this.itemAdd} onItemCancel={this.toggleEditRemote}/>
					</CardText>
				</Card>
				<div style={{position: 'absolute', zIndex: '99', top: '8px', right: '8px'}}>
						<IconButton name="more_vert" id="demo-menu-lower-right" />
						<Menu target="demo-menu-lower-right" align="right">
								<MenuItem onClick={this.toggleEditRemote}>Edit</MenuItem>
						</Menu>
				</div>
			</Section>
			</div>
		);
	}
}

Locations.propTypes = {
	remotes: React.PropTypes.array
};

Locations.defaultProps = {
	remotes: []
};
