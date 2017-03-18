import fetch from 'isomorphic-fetch';

export const REQUEST_ORG = 'REQUEST_ORG';
export const RECEIVE_ORG = 'RECEIVE_ORG';

export const requestOrgs = () => {
  return {
    type: REQUEST_ORG
  }
};

export const receiveOrgs = (data) => {
  console.log(data);
  return {
    type: RECEIVE_ORG,
    data
  }
};

export const fetchOrgs = () => {
  return dispatch => {
    dispatch(requestOrgs());
    return fetch(`/graphql`, {
      method: 'POST',
      headers: {'Content-Type': 'application/graphql'},
      body: 'query q { organizations { id name } }'
    })
      .then(response => response.json())
      .then(json => dispatch(receiveOrgs(json.data)))
  }
};