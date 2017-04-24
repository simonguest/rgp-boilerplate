import React, {Component} from 'react';
import { connect } from 'react-redux';
import AdminHeader from '../components/Header';
import OrgPanel from '../containers/OrgPanel';
import Error from '../components/Error';

class Admin extends Component {

  render() {
    const { isFetching, error } = this.props;
    return (
      <div>
        <AdminHeader isFetching={isFetching}/>
        <OrgPanel/>
        <br/>
        <a href="/">Return to site</a>
        <Error error={error}/>
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

const mapDispatchToProps = (dispatch) =>
{
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);