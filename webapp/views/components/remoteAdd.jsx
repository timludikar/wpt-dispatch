import React, { PropTypes, Component } from 'react';
import { ListItem, ListItemContent, ListItemAction, Icon, Textfield, Button } from 'react-mdl';
import { connect } from 'react-redux';
import { createRemote, editRemote, clearValues, updateValues } from '../../actions/remote';

class RemoteAdd extends React.Component {
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onChange(e){
    let result = {};
    result[e.target.id] = e.target.value;
    this.props.dispatch(updateValues(e.target.id, e.target.value));
  }

  onClick(){
    this.props.dispatch(createRemote(this.props));
  }

  onCancel(){
    this._clearFields();
    this.props.dispatch(editRemote());
  }

  _clearFields(){
    this.props.dispatch(clearValues());
  }

  _validateSave(){
    if(this.props.label === "" || this.props.url === "") {
      return <ListItemAction><Button onClick={this.onClick} disabled raised ripple>Save</Button></ListItemAction>;
    }
    return <ListItemAction><Button onClick={this.onClick} raised ripple>Save</Button></ListItemAction>;
  }

  render () {
    let hidden = this.props.isEditable === true ? "" : "hidden";
    return(
      <ListItem className={hidden}>
        <ListItemContent>
          <Textfield
            id="label"
            onChange={this.onChange}
            value={this.props.label}
            label="Label..."
            floatingLabel
            style={{width: '200px'}}
            ref="labelInput"
          />
        </ListItemContent>

        <ListItemContent>
          <Textfield
            id="url"
            onChange={this.onChange}
            label="Url..."
            value={this.props.url}
            floatingLabel
            style={{width: '200px'}}
            ref="urlInput"
          />
        </ListItemContent>
        {this._validateSave()}
        <ListItemAction><Button onClick={this.onCancel} raised ripple>Cancel</Button></ListItemAction>
      </ListItem>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    label: state.fields.label,
    url: state.fields.url,
    isEditable: state.isEditable,
  };
}

export default connect(mapStateToProps)(RemoteAdd);
