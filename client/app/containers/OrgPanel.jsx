import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import OrgList from '../components/OrgList'
import {  fetchOrgs} from '../actions/orgs';

const mapStateToProps = (state) => {
  return {
    orgs: state.orgs.items
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrgs: () => {
      dispatch(fetchOrgs())
    }
  }
};

const OrgPanel = connect(mapStateToProps, mapDispatchToProps)(OrgList);

export default OrgPanel;