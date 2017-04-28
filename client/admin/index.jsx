import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import SideBar from './SideBar';
import Main from './Main';
import Error from './Error';

import { dismissApiError } from '../actions';

class Admin extends Component {

  render() {
    const { isFetching, error, dismissApiError } = this.props;
    return (
      <div>
        <Header isFetching={isFetching}/>
        <SideBar/>
        <Main>
            <Error error={error} onDismiss={dismissApiError}/>
            {this.props.children}
        </Main>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.orgs.isFetching,
    error: state.orgs.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dismissApiError: () => {
      dispatch(dismissApiError())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
