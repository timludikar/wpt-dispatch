import { ADD_REMOTE, REMOVE_REMOTE } from '../actions/remote';

const initialState = {
  remotes: [{
    "id": "95e8c9a1-5087-424f-bad6-8802ba766247",
    "label": "Razorfish",
    "url": "www.rfz.com"
  }]
};

export default function remoteApp(state = initialState, action){
  switch (action.type) {
    case ADD_REMOTE:
      return Object.assign({}, state, {
        remotes: [
            ...state.remotes
        ]
      });
    case REMOVE_REMOTE:
      let filtered = state.remotes.filter(remote => {
        return remote.id !== action.id;
      });
      console.log(filtered);
      return Object.assign({}, state, {
        remotes: filtered
      });
    default:
      return state;
  }

}
