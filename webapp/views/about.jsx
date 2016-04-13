import React, { Component } from 'react';
import { List, ListItem, ListItemContent, ListItemAction, Icon } from 'react-mdl';

export class About extends Component {
	render() {
		return (
			<div><List style={{width: '300px'}}>
  <ListItem>
    <ListItemContent avatar="person">Bryan Cranston</ListItemContent>
    <ListItemAction>
      <a href="#"><Icon name="star" /></a>
    </ListItemAction>
  </ListItem>
  <ListItem>
    <ListItemContent avatar="person">Aaron Paul</ListItemContent>
    <ListItemAction>
      <a href="#"><Icon name="star" /></a>
    </ListItemAction>
  </ListItem>
  <ListItem>
    <ListItemContent avatar="person">Bob Odenkirk</ListItemContent>
    <ListItemAction>
      <a href="#"><Icon name="star" /></a>
    </ListItemAction>
  </ListItem>
</List></div>
		);
	}
}
