import React, {Component} from 'react';
import { connect } from 'react-redux';
import AdminHeader from '../components/Header';
import OrgPanel from '../containers/OrgPanel';

class Admin extends Component {

  render() {
    const { } = this.props;
    return (
      <div>
        <AdminHeader/>
        <OrgPanel/>
        <a href="/">Return to site</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);