import React, {Component} from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import OrgPanel from './OrgPanel';

class App extends Component {

  render() {
    const { } = this.props;
    return (
      <div>
        <Header/>
        <OrgPanel/>
        <a href="/admin">Admin</a>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) =>
{
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);