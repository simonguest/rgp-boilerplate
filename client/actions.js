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
  }
};

export const selectOrg = (data) => {
  return {
    type: SELECT_ORG,
    data
  }
};

export const mutateOrg = (data) => {
  return {
    type: MUTATE_ORG,
    data
  }
};

export const updateOrg = (data) => {
  return dispatch => {
    dispatch(mutateOrg(data));
    return gql(
      `mutation mm { renameOrganization(id:"${data.id}", name:"${data.name}") { id } }`,
      data => dispatch(fetchOrgs()),
      err => dispatch(apiError(err))
    )
  };
};

export const deleteOrg = (data) => {
  return dispatch => {
    dispatch(mutateOrg({id:data.id}));
    return gql(
      `mutation mm { removeOrganization(id:"${data.id}") { id } }`,
      (data) => dispatch(fetchOrgs()),
      err => dispatch(apiError(err))
    )
  };
};

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
      `query q { organizations { id name usercount } }`,
      data => dispatch(receiveOrgs(data)),
      err => dispatch(apiError(err))
    );
  }
};