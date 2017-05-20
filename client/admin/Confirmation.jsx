import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class Confirmation extends Component {
  componentDidMount() {
    $(ReactDOM.findDOMNode(this)).modal('show');
  }

  componentWillUnmount() {
    $(ReactDOM.findDOMNode(this)).modal('hide');
  }

  render() {
    const { title, message, onDismiss, onConfirm, dismissText = 'No', confirmText = 'Yes' } = this.props;
    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onDismiss}><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">{title}</h4>
            </div>
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={onDismiss}>{dismissText}</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={onConfirm}>{confirmText}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Confirmation.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default Confirmation
