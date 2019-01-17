import {
  CHANGE_INPUT,
  SUBMIT_INPUT,
  DELETE_ITEM,
} from './types'

export function inputChange(data) {
  return {
    type: CHANGE_INPUT,
    data,
  }
}
export function inputSubmit(data) {
  return {
    type: SUBMIT_INPUT,
    data,
  }
}
export function deleteItem(data) {
  return {
    type: DELETE_ITEM,
    data,
  }
}