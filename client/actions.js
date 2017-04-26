import gql from './gql';

export const REQUEST_ORG = 'REQUEST_ORG';
export const RECEIVE_ORG = 'RECEIVE_ORG';
export const SELECT_ORG = 'SELECT_ORG';
export const MUTATE_ORG = 'MUTATE_ORG';
export const API_ERROR = 'API_ERROR';

export const apiError = (data) => {
  return {
    type: API_ERROR,
    data
  };
};

export const selectOrg = (data) => {
  return {
    type: SELECT_ORG,
    data
  };
};

export const mutateOrg = (data) => {
  return {
    type: MUTATE_ORG,
    data
  };
};

export const requestOrgs = () => {
  return {
    type: REQUEST_ORG
  };
};

export const receiveOrgs = (data) => {
  return {
    type: RECEIVE_ORG,
    data
  };
};

export const fetchOrgs = () => {
  return dispatch => {
    dispatch(requestOrgs());
    return gql(
      'query q { organizations { id name usercount } }',
      data => dispatch(receiveOrgs(data)),
      err => dispatch(apiError(err))
    );
  };
};

export const updateOrg = (data) => {
  return dispatch => {
    dispatch(mutateOrg(data));
    return gql(
      `mutation uo { renameOrganization(id:"${data.id}", name:"${data.name}") { id } }`,
      () => dispatch(fetchOrgs()),
      err => dispatch(apiError(err))
    );
  };
};

export const deleteOrg = (data) => {
  return dispatch => {
    dispatch(mutateOrg({ id: data.id }));
    return gql(
      `mutation do { removeOrganization(id:"${data.id}") { id } }`,
      () => dispatch(fetchOrgs()),
      err => dispatch(apiError(err))
    );
  };
};

export const createOrg = (data) => {
  return dispatch => {
    dispatch(mutateOrg({ id: data.id }));
    return gql(
      `mutation co { addOrganization(name:"${data.name}") { id } }`,
      () => dispatch(fetchOrgs()),
      err => dispatch(apiError(err))
    );
  };
};
