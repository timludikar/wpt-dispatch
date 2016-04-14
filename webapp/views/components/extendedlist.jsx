import React, { Component } from 'react';
import { List, ListItem, ListItemAction, ListItemContent, IconButton, Icon, Textfield, Button } from 'react-mdl';

class ExtendedList extends Component {
  constructor(props){
    super(props);
    this.state = {
      label: "",
      url: ""
    };
    this._addRemoteChange = this._addRemoteChange.bind(this);
  }

  _addListFields () {
    if(this.props.editable){
      return (
        <ListItem>
          <ListItemContent>
            <Textfield
              id="label"
              onChange={this._addRemoteChange}
              value={this.state.label}
              label="Label..."
              floatingLabel
              style={{width: '200px'}}
              />
          </ListItemContent>

          <ListItemContent>
            <Textfield
              id="url"
              onChange={this._addRemoteChange}
              value={this.state.url}
              label="Url..."
              floatingLabel
              style={{width: '200px'}}
              />
          </ListItemContent>
          <ListItemAction><Button onClick={this.props.onItemAdd.bind(null, this.state)} raised ripple>Save</Button></ListItemAction>
          <ListItemAction><Button onClick={this.props.onItemCancel} raised ripple>Cancel</Button></ListItemAction>
        </ListItem>
      );
    }
    return "";
  }

  _addRemoteChange(e){
    let result = {};
    result[e.target.id] = e.target.value;
    this.setState(result);
  }

  render() {
    let items = this.props.remotes.map(remote => {
      let editable = this.props.editable === true ? <ListItemAction><a href="#"><Icon name="remove_circle" onClick={this.props.onItemRemove.bind(null, remote.id)} /></a></ListItemAction> : <ListItemAction />;

      return (
        <ListItem twoLine key={remote.label}>
          <ListItemContent avatar="cloud_circle" subtitle={remote.url}>{remote.label}</ListItemContent>
          {editable}
        </ListItem>
      );
    });

    return (
      <List>
          {items}
          {this._addListFields()}
      </List>
    );
  }
}

export default ExtendedList;
