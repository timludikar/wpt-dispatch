export const ADD_REMOTE = 'ADD_REMOTE';
export const REMOVE_REMOTE = 'REMOVE_REMOTE';

export const addRemote = (remote) => {
  return {
    type: ADD_REMOTE,
    remote
  };
}

export const removeRemote = (id) => {
  return {
    type: REMOVE_REMOTE,
    id
  };
}
