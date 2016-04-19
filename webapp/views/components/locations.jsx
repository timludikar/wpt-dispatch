import React, { Component } from 'react';
import { Card,
				CardTitle,
				CardText,
				Icon,
				Button,
				Checkbox,
				Textfield,
				IconButton,
				Menu,
				MenuItem
			} from 'react-mdl';
import { Section } from './section.jsx';
import ExtendedList from './extendedlist.jsx';
import { deleteRemote, editRemote } from '../../actions/remote';
import { Provider, connect } from 'react-redux';
import RemoteApp from '../../reducers/remoteReducer';
import RemoteList from '../../containers/VisibleRemotes';
import ServerRemotes from './remoteAdd.jsx';

class Locations extends Component {
	constructor(props){
		super(props);
		this.toggleEditRemote = this.toggleEditRemote.bind(this);
		this.itemRemove = this.itemRemove.bind(this);
	}

	toggleEditRemote(e){
		this.props.dispatch(editRemote());
	}

	itemRemove(e){
		this.props.dispatch(deleteRemote(e));
	}

	render() {
		return (
			<div>
			<Section>
				<Card className="mdl-cell mdl-cell--10-col" shadow={0} style={{'width': '100%'}}>
					<CardText style={{'width':'750px', 'margin':'auto'}}>
						<h4>WebPageTest Hosts</h4>
						<RemoteList />
						<ServerRemotes />
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

export default connect()(Locations);
