import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router'

export default class SideBar extends Component {
  render() {
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
        </div>
      </div>
    );
  }
};

SideBar.propTypes = {
};