import { ADD_REMOTE, REMOVE_REMOTE, RECEIVED_REMOTES, EDIT_REMOTE, CLEAR_VALUES,UPDATE_VALUES } from '../actions/remote';

const initialState = {
  isEditable: false,
  remotes: [],
  fields: {
    label: "",
    url: ""
  }
};

export default function remoteApp(state = initialState, action){
  switch (action.type) {
    case ADD_REMOTE:
      return Object.assign({}, state, {
        remotes: [
            ...state.remotes,
            action.remote
        ]
      });
    case REMOVE_REMOTE:
      return Object.assign({}, state, {
        remotes: state.remotes.filter(remote => {
          return remote.id !== action.id;
        })
      });
    case EDIT_REMOTE:
      return Object.assign({}, state, {
        isEditable: !state.isEditable
      });
    case RECEIVED_REMOTES:
      return Object.assign({}, state, {
        remotes: [
          ...action.remotes
        ]
      });
    case CLEAR_VALUES:
      return Object.assign({}, state, { fields: { label: "", url: "" }});
    case UPDATE_VALUES:
      let update = { fields: {} };
      update.fields[action.field] = action.value;
      return Object.assign({}, state, { fields: Object.assign({}, state.fields, update.fields)} );
    default:
      return state;
  }

}
