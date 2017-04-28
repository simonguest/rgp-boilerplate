import React, {Component, PropTypes} from 'react'

class Error extends Component {
  render() {
    const { error } = this.props;
    let errorStyle = { color: 'red'};
    return (
      <p style={errorStyle} id="error">{error ? 'An error has occurred: ' + error : ''}</p>
    );
  }
}

Error.propTypes = {
  error: PropTypes.string.isRequired
};

export default Error;