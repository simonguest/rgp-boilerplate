import React, {Component} from 'react';
import { connect } from 'react-redux';
import AdminHeader from '../components/Header';
import OrgPanel from '../containers/OrgPanel';

class Admin extends Component {

  render() {
    const { isFetching } = this.props;
    return (
      <div>
        <AdminHeader isFetching={isFetching}/>
        <OrgPanel/>
        <br/>
        <a href="/">Return to site</a>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.orgs.isFetching
  }
};

const mapDispatchToProps = (dispatch) =>
{
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);