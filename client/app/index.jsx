import React, {Component} from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Error from './Error';
import OrgPanel from './organizations';

class App extends Component {

  render() {
    const { error } = this.props;
    return (
      <div>
        <Header/>
        <OrgPanel/>
        <Error error={error}/>
        <a href="/admin">Admin</a>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.orgs.error
  }
};

const mapDispatchToProps = (dispatch) =>
{
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);