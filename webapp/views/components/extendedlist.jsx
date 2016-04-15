import React, { Component, PropTypes } from 'react';
import { List, ListItem, ListItemAction, ListItemContent, IconButton, Icon, Textfield, Button } from 'react-mdl';
import Remote from './remote.jsx';

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
    return (
      <List>
          {this.props.remotes.map(remote => {
              return (<Remote
                key={remote.id}
                remote={remote}
                editable={this.props.editable}
                onClick={this.props.onItemRemove}
              />);
          })}
          {this._addListFields()}
      </List>
    );
  }
}

// export default ExtendedList;


const RemoteList = ({ remotes, onItemAdd, onItemRemove }) => {
  return (
    <List>
        {remotes.map(remote => {
            return (<Remote
              key={remote.id}
              remote={remote}
              editable={true}
              onClick={onItemRemove}
            />);
        })}
    </List>
  );
}

RemoteList.protoTypes = {
  remotes: PropTypes.array.isRequired,
  onItemAdd: PropTypes.func.isRequired,
  onItemRemove: PropTypes.func.isRequired
}

export default RemoteList
