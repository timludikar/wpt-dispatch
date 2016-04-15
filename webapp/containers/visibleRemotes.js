import { connect } from 'react-redux';
import { addRemote, removeRemote } from '../actions/remote';
import RemoteList from '../views/components/extendedlist.jsx';

const getRemotes = (remotes) => {
  return remotes;
}

const mapStateToProps = (state) => {
  return {
    remotes: getRemotes(state.remotes)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onItemAdd: (remote) => {
      dispatch(addRemote(remote))
    },
    onItemRemove: (id) => {
      dispatch(removeRemote(id))
    }
  }
}

const VisibleRemotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoteList);

export default VisibleRemotes;
