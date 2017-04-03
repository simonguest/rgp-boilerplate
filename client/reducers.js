import R from 'ramda';
import {RECEIVE_ORG, REQUEST_ORG} from './app/actions/orgs';

export default function organizations(state = {isFetching: false, items:[]}, action) {
  switch (action.type) {
    case REQUEST_ORG:
      return R.evolve({isFetching: true}, state);
    case RECEIVE_ORG:
      return R.evolve({isFetching: false, items: R.concat(action.data.organizations)}, state);
    default:
      return state;
  }
}