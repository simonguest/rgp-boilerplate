import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import UserList from '../components/UserList'

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

const UserPanel = connect(mapStateToProps, mapDispatchToProps)(UserList);

export default UserPanel;