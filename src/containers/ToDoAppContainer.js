import { connect } from 'react-redux';
import ToDoApp from '../components/ToDoApp.js';
import { inputChange, inputSubmit, deleteItem } from '../redux/modules/actions';

function mapStateToProps(state) {
  return {
    ToDoApp: state.toDoApp
  }
}
function mapDispatchToProps(dispatch) {
  return {
    inputChange: (value) => dispatch(inputChange(value)),
    inputSubmit: (value) => dispatch(inputSubmit(value)),
    deleteItem: (value) => dispatch(deleteItem(value)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ToDoApp)
