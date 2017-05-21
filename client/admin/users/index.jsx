import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

class Users extends Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Users</h1>
      </div>
    );
  }
}

Users.propTypes = {
};

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);