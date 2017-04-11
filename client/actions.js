import gql from './gql';

export const REQUEST_ORG = 'REQUEST_ORG';
export const RECEIVE_ORG = 'RECEIVE_ORG';
export const SELECT_ORG = 'SELECT_ORG';
export const UPDATE_ORG = 'UPDATE_ORG';
export const MUTATE_ORG = 'MUTATE_ORG';

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
      (data) => {
        console.log(data);
        dispatch(fetchOrgs());
      },
      (err) => {
        console.log(err);
      }
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
      `query q { organizations { id name } }`,
      data => dispatch(receiveOrgs(data)),
      err => console.log(err)
    );
  }
};