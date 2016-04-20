import React, { PropTypes, Component } from 'react';
import { ListItem, ListItemContent, ListItemAction, Icon } from 'react-mdl';

const Remote = ({ onClick, editable, remote}) => {
  let isEditable = editable === true ? <ListItemAction><a href="#"><Icon name="remove_circle" onClick={onClick.bind(null, remote.id)} /></a></ListItemAction> : <ListItemAction />;

  return(
    <ListItem twoLine key={remote.label}>
      <ListItemContent avatar="cloud_circle" subtitle={remote.url}>{remote.label}</ListItemContent>
      {isEditable}
    </ListItem>
  );
}

Remote.propTypes = {
  onClick: PropTypes.func.isRequired,
  editable: PropTypes.bool.isRequired,
  remote: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    url: PropTypes.string
  })
}

export default Remote;
