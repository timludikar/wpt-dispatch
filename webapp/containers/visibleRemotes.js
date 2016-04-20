import { connect } from 'react-redux';
import { addRemote, removeRemote, deleteRemote } from '../actions/remote';
import RemoteList from '../views/components/remotes/remotelist.jsx';

const mapStateToProps = (state) => {
  return {
    isEditable: state.isEditable,
    remotes: state.remotes
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onItemRemove: (id) => {
      dispatch(deleteRemote(id))
    }
  }
}

const VisibleRemotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoteList);

export default VisibleRemotes;
