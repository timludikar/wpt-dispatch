import fetch from 'isomorphic-fetch';

export const ADD_REMOTE = 'ADD_REMOTE';
export const REMOVE_REMOTE = 'REMOVE_REMOTE';
export const REQUEST_REMOTES = 'REQUEST_REMOTES';
export const RECEIVED_REMOTES = 'RECEIVED_REMOTES';
export const EDIT_REMOTE = 'EDIT_REMOTE';
export const UPDATE_VALUES = 'UPDATE_VALUES';
export const CLEAR_VALUES = 'CLEAR_VALUES';

const graphql = (data) => {
	return fetch('/graphql', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export const editRemote = (editable) => {
  return {
    type: EDIT_REMOTE,
    editable
  }
}

const addRemote = (remote) => {
  return {
    type: ADD_REMOTE,
    remote
  };
}

const removeRemote = (id) => {
  return {
    type: REMOVE_REMOTE,
    id
  };
}

export const requestRemotes = (remotes) => {
  return {
    type: REQUEST_REMOTES,
    remotes
  }
}

export const receivedRemotes = (remotes) => {
  return {
    type: RECEIVED_REMOTES,
    remotes: remotes.locations
  }
}

export const clearValues = () => {
	return {
		type: CLEAR_VALUES
	}
}

export const updateValues = (field, value) => {
	return {
		type: UPDATE_VALUES,
		field: field,
		value: value
	}
}

export const createRemote = (remote) => {
  return (dispatch) => {
		let data = { query: 'mutation { createHost(label:"' + remote.label + '" url:"' + remote.url + '"){ id, label, url }}' };
    return graphql(data).then(response => response.json()).then(res => res.data).then(data => {
      if(data.createHost){
        dispatch(addRemote(data.createHost));
				dispatch(clearValues());
      }
    });
  }
}

export const deleteRemote = (id) => {
  return (dispatch) => {
		let data = { query: 'mutation { removeHost(id:"' + id + '")}' };
    return graphql(data).then(response => response.json()).then(res => res.data).then(data => {
      if(data.removeHost){
        dispatch(removeRemote(id));
      }
    });
  }
}

export const fetchRemotes = (remotes) => {
  return (dispatch) => {
    dispatch(requestRemotes(remotes));
		let data = { query: '{locations{ id, label, url }}' };

    return graphql(data).then(response => response.json()).then(res => res.data).then(data => {
      dispatch(receivedRemotes(data));
    });
  }
}
