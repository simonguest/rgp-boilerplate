import gql from '../../gql';

export const REQUEST_ORG = 'REQUEST_ORG';
export const RECEIVE_ORG = 'RECEIVE_ORG';

export const requestOrgs = () => {
  return {
    type: REQUEST_ORG
  }
};

export const receiveOrgs = (data) => {
  return {
    type: RECEIVE_ORG,
    data
  }
};

export const fetchOrgs = () => {
  return dispatch => {
    dispatch(requestOrgs());
    return gql(
      `query q { organizations { id name } }`,
      data => dispatch(receiveOrgs(data)),
      err => console.log(err)
    )
  }
};