import React, { Component, PropTypes } from 'react'

class Error extends Component {
  render() {
    const { error, onDismiss } = this.props;
	return error ? (
      <div className="alert alert-danger alert-dismissible" role="alert">
		<button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={onDismiss}><span aria-hidden="true">&times;</span></button>
		<strong>An error has occurred!</strong> {error}
	  </div>
	) : null;
  }
}

Error.propTypes = {
  error: PropTypes.string.isRequired
};

export default Error;
