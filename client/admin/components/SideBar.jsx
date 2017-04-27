import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router'

import OrgPanel from '../containers/OrgPanel';
import Error from '../components/Error';

export default class SideBar extends Component {
  render() {
    const { error } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3 col-md-2 sidebar">
            <ul className="nav nav-sidebar">
              <li><Link to="/admin">Dashboard</Link></li>
              <li><Link to="/admin/organizations">Organizations</Link></li>
              <li><Link to="/admin/users">Users</Link></li>
            </ul>
          </div>
          <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            {this.props.children}
            <Error error={error}/>
          </div>
        </div>
      </div>
    );
  }
};

SideBar.propTypes = {
  error: PropTypes.string.isRequired
};