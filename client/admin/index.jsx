import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import SideBar from './SideBar';
import Main from './Main';
import Error from './Error';
import Confirmation from './Confirmation';

import { onErrorDismiss } from '../actions';

class Admin extends Component {

  render() {
    const { isFetching, error, onErrorDismiss, confirmation } = this.props;
    return (
      <div>
        <Header isFetching={isFetching}/>
        <SideBar/>
        <Main>
          {error ? <Error error={error} onDismiss={onErrorDismiss}/> : null}
          {confirmation.message ? <Confirmation title={confirmation.title} message={confirmation.message} onDismiss={confirmation.onDismiss} onConfirm={confirmation.onConfirm} dismissText={confirmation.dismissText} confirmText={confirmation.confirmText}/> : null }
          {this.props.children}
        </Main>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.orgs.isFetching,
    error: state.application.error,
    confirmation: state.application.confirmation
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onErrorDismiss: () => {
      dispatch(onErrorDismiss())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
