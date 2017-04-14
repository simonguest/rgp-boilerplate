import {RECEIVE_ORG, REQUEST_ORG, SELECT_ORG, API_ERROR} from './actions';

export default function organizations(state = {isFetching: false, items: [], selectedOrg: '', error: ''}, action) {
  switch (action.type) {
    case REQUEST_ORG:
     return Object.assign({}, state, {isFetching: true});
    case RECEIVE_ORG:
      return Object.assign({}, state, {isFetching: false, items: action.data.organizations});
    case SELECT_ORG:
      return Object.assign({}, state, {selectedOrg: action.data.id});
    case API_ERROR:
      return Object.assign({}, state, {error: action.data});
    default:
      return state;
  }
}