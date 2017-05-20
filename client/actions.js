import gql from './gql';

export const REQUEST_ORG = 'REQUEST_ORG';
export const RECEIVE_ORG = 'RECEIVE_ORG';
export const SELECT_ORG = 'SELECT_ORG';
export const MUTATE_ORG = 'MUTATE_ORG';
export const ERROR = 'ERROR';
export const DISMISS_ERROR = 'DISMISS_ERROR';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_CONFIRMATION = 'OPEN_CONFIRMATION';
export const CLOSE_CONFIRMATION = 'CLOSE_CONFIRMATION';

export const openModal = (data, onDismiss, onConfirm) => {
  return {
    type: OPEN_MODAL,
    data: data,
    onDismiss: onDismiss,
    onConfirm: onConfirm
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

export const openConfirmation = (data) => {
  return {
    type: OPEN_CONFIRMATION,
    data: data,
  };
};

export const closeConfirmation = () => {
  return {
    type: CLOSE_CONFIRMATION
  };
};

export const error = (message) => {
  return {
    type: ERROR,
    message
  };
};

export const onErrorDismiss = () => {
  return {
    type: DISMISS_ERROR
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
      err => dispatch(error(err))
    );
  };
};

export const updateOrg = (data) => {
  return dispatch => {
    dispatch(mutateOrg(data));
    return gql(
      `mutation uo { renameOrganization(id:"${data.id}", name:"${data.name}") { id } }`,
      () => dispatch(fetchOrgs()),
      err => dispatch(error(err))
    );
  };
};

export const deleteOrg = (data) => {
  return dispatch => {
    dispatch(mutateOrg({ id: data.id }));
    return gql(
      `mutation do { removeOrganization(id:"${data.id}") { id } }`,
      () => dispatch(fetchOrgs()),
      err => dispatch(error(err))
    );
  };
};

export const createOrg = (data) => {
  return dispatch => {
    dispatch(mutateOrg({ id: data.id }));
    return gql(
      `mutation co { addOrganization(name:"${data.name}") { id } }`,
      () => dispatch(fetchOrgs()),
      err => dispatch(error(err))
    );
  };
};
