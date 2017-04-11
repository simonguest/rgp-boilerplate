import {RECEIVE_ORG, REQUEST_ORG, SELECT_ORG} from './actions';

export default function organizations(state = {isFetching: false, items: [], selectedOrg: ''}, action) {
  switch (action.type) {
    case REQUEST_ORG:
     return Object.assign({}, state, {isFetching: true});
    case RECEIVE_ORG:
      return Object.assign({}, state, {isFetching: false, items: action.data.organizations});
    case SELECT_ORG:
      return Object.assign({}, state, {selectedOrg: action.data.id});
    default:
      return state;
  }
}