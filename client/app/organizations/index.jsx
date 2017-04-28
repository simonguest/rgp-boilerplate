import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {  fetchOrgs} from '../../actions';

class OrgPanel extends Component {
  componentDidMount() {
    const {fetchOrgs} = this.props;
    fetchOrgs();
  }

  render() {
    const {orgs} = this.props;
    let orgItems = orgs.map((org) => {
      return (
        <p key={org.id}>{org.name}</p>
      );
    });
    return (
      <div>
      <p>test</p>
        {orgItems}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orgs: state.orgs.items
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrgs: () => {
      dispatch(fetchOrgs())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrgPanel);