import React, { Component, PropTypes } from 'react';

export default class AdminHeader extends Component {
  render() {
    const { isFetching } = this.props;
    let title = `Sample Application - Admin Page ${isFetching ? '(Loading)' : ''}`;
    return (
      <div>
        <h1>{title}</h1>
      </div>
    );
  }
};

AdminHeader.propTypes = {
  isFetching: PropTypes.bool.isRequired
};