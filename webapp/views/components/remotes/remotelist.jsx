import React, { Component, PropTypes } from 'react';
import { List, ListItem, ListItemAction, ListItemContent, IconButton, Icon, Textfield, Button } from 'react-mdl';
import Remote from './remote.jsx';

const RemoteList = ({ remotes, isEditable, onItemAdd, onItemRemove }) => {
  return (
    <List>
        {remotes.map(remote => {
            return (<Remote
              key={remote.id}
              remote={remote}
              editable={isEditable}
              onClick={onItemRemove}
            />);
        })}
    </List>
  );
}

RemoteList.protoTypes = {
  remotes: PropTypes.array.isRequired,
  isEditable: PropTypes.bool.isRequired,
  onItemAdd: PropTypes.func.isRequired,
  onItemRemove: PropTypes.func.isRequired
}

export default RemoteList
