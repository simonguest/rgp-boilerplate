/* eslint-disable */
import { RECEIVE_ORG, REQUEST_ORG, SELECT_ORG, ERROR, DISMISS_ERROR, OPEN_MODAL, CLOSE_MODAL, OPEN_CONFIRMATION, CLOSE_CONFIRMATION } from './actions';

export function organizations(state = { isFetching: false, items: [], selectedOrg: '' }, action) {
  switch (action.type) {
    case REQUEST_ORG:
      return Object.assign({}, state, { isFetching: true });
    case RECEIVE_ORG:
      return Object.assign({}, state, { isFetching: false, items: action.data.organizations });
    case SELECT_ORG:
      return Object.assign({}, state, { selectedOrg: action.data.id });
    default:
      return state;
  }
}

export function application(state = { confirmation: { message: '' }, modal: { type: '' }, error: '' }, action) {
  switch (action.type) {
    case ERROR:
      return Object.assign({}, state, { error: action.message });
    case DISMISS_ERROR:
      return Object.assign({}, state, { error: '' });
    case OPEN_MODAL:
      return Object.assign({}, state, { modal: { type: action.data, onDismiss: action.onDismiss, onConfirm: action.onConfirm } });
    case CLOSE_MODAL:
      return Object.assign({}, state, { modal: { type: '', onDismiss: () => {}, onConfirm: () => {} } });
    case OPEN_CONFIRMATION:
      return Object.assign({}, state, { confirmation: { title: action.data.title, message: action.data.message, onDismiss: action.data.onDismiss, onConfirm: action.data.onConfirm, dismissText: action.data.dismissText, confirmText: action.data.confirmText } });
    case CLOSE_CONFIRMATION:
      return Object.assign({}, state, { confirmation: { message: '' } });
    default:
      return state;
  }
}
