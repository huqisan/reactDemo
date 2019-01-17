import {
  CHANGE_INPUT,
  SUBMIT_INPUT,
  DELETE_ITEM,
} from './types'

const initialState = {
  list: [{ item: "test", done: false }],
  newToDo: ""
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return Object.assign({}, state, { newToDo: action.data });
    case SUBMIT_INPUT:
      return Object.assign({}, state, {
        list: [...state.list, { item: state.newToDo, done: false }],
        newToDo: ''
      });
    case DELETE_ITEM:
      return Object.assign({}, state, {
        list: [...state.list.slice(0, action.data), ...state.list.slice(action.data + 1)],
      });
    default:
      return state;
  }
}