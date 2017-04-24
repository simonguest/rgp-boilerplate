import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import OrgList from '../components/OrgList'
import {selectOrg, fetchOrgs, updateOrg, deleteOrg} from '../../actions';

const mapStateToProps = (state) => {
  return {
    orgs: state.orgs.items,
    selectedOrg: state.orgs.selectedOrg,
    isFetching: state.orgs.isFetching
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrgs: () => {
      dispatch(fetchOrgs())
    },
    selectOrg: (data) => {
      dispatch(selectOrg(data))
    },
    updateOrg: (data) => {
      dispatch(updateOrg(data))
    },
    deleteOrg: (data) => {
      dispatch(deleteOrg(data))
    }
  }
};

const OrgPanel = connect(mapStateToProps, mapDispatchToProps)(OrgList);

export default OrgPanel;