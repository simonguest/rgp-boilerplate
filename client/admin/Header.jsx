import React, { Component, PropTypes } from 'react';

export default class Header extends Component {
  render() {
    const { isFetching } = this.props;
    let title = `Sample Application - Admin Page ${isFetching ? '(Loading)' : ''}`;
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">{title}</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right">
              <li><a href="/">Return</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
};

Header.propTypes = {
  isFetching: PropTypes.bool.isRequired
};