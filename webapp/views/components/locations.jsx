import React, { Component } from 'react';
import {Card, CardTitle, CardText, List, ListItem, ListItemAction, ListItemContent, Icon, Button, Checkbox, Textfield, IconButton, Menu, MenuItem} from 'react-mdl';
import { Section } from './section.jsx';

export class Locations extends Component {
	constructor(props){
		super(props);
		this.state = {
			editable: false,
			add: false
		};
		this.toggleAddRemote = this.toggleAddRemote.bind(this);
		this.toggleEditRemote = this.toggleEditRemote.bind(this);
	}

	toggleAddRemote(e){
		this.setState({
			add: !this.state.add
		});
	}

	toggleEditRemote(e){
		this.setState({
			editable: !this.state.editable
		});
	}

	render() {
		let addRemote;
		let editRemote = {};

		if(this.state.editable){
			editRemote = <ListItem twoLine>
				<ListItemContent avatar="cloud_circle" subtitle="http://10.50.10.20">Razorfish Toronto</ListItemContent>
				<ListItemAction><a href="#"><Icon name="remove_circle" /></a></ListItemAction>
			</ListItem>;
		} else {
			editRemote = <ListItem twoLine>
				<ListItemContent avatar="cloud_circle" subtitle="http://10.50.10.20">Razorfish Toronto</ListItemContent>
			</ListItem>;
		}

		if(this.state.add){
			addRemote =
				<ListItem>
					<ListItemContent>
						<Textfield
							onChange={() => {}}
							label="Label..."
							floatingLabel
							style={{width: '200px'}}
							/>
					</ListItemContent>

					<ListItemContent>
						<Textfield
							onChange={() => {}}
							label="Url..."
							floatingLabel
							style={{width: '200px'}}
							/>
					</ListItemContent>
					<ListItemAction><Button raised ripple>Save</Button></ListItemAction>
					<ListItemAction><Button onClick={this.toggleAddRemote} raised ripple>Cancel</Button></ListItemAction>
				</ListItem>;
		}
		
		return (
			<div>
			<Section>
				<Card className="mdl-cell mdl-cell--10-col" shadow={0} style={{'width': '100%'}}>
					<CardText style={{'width':'750px', 'margin':'auto'}}>
						<h4>WebPageTest Hosts</h4>
						<List>
							{editRemote}
							{addRemote}
						</List>
					</CardText>
				</Card>
				<div style={{position: 'absolute', zIndex: '99', top: '8px', right: '8px'}}>
						<IconButton name="more_vert" id="demo-menu-lower-right" />
						<Menu target="demo-menu-lower-right" align="right">
								<MenuItem onClick={this.toggleAddRemote}>Add Host</MenuItem>
								<MenuItem onClick={this.toggleEditRemote}>Edit Host</MenuItem>
						</Menu>
				</div>
			</Section>
			</div>
		);
	}
}
