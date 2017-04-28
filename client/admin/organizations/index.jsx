import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectOrg, fetchOrgs, updateOrg, deleteOrg, createOrg } from '../../actions';

import EditForm from './EditForm';
import CreateForm from './CreateForm';

class OrgPanel extends Component {
  componentDidMount() {
    const {fetchOrgs} = this.props;
    fetchOrgs();
  }

  render() {
    const {orgs, selectedOrg, selectOrg, updateOrg, deleteOrg, createOrg} = this.props;
    const lineStyle = {cursor: 'pointer'};
    let orgItems = orgs.map((org) => {
      return (
        <div key={org.id}>
          <li style={lineStyle} onClick={() => selectOrg({id: org.id})}>{org.name} ({org.usercount} user{org.usercount > 1 ? 's' : ''})</li>
          {org.id === selectedOrg ? <EditForm updateClick={(name) => updateOrg({id: org.id, name: name})} deleteClick={() => deleteOrg({id: org.id})}/> : null }
        </div>
      );
    });
    return (
      <div>
        <h1 className="page-header">Organizations</h1>
        {orgItems}
        <CreateForm createClick={(name) => createOrg({name: name})}/>
      </div>
    );
  }
}

OrgPanel.propTypes = {
  selectedOrg: PropTypes.string.isRequired,
  orgs: PropTypes.array.isRequired,
  selectOrg: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  updateOrg: PropTypes.func.isRequired,
  deleteOrg: PropTypes.func.isRequired,
  createOrg: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    orgs: state.orgs.items,
    selectedOrg: state.orgs.selectedOrg,
    isFetching: state.orgs.isFetching
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrgs: () => {
      dispatch(fetchOrgs())
    },
    selectOrg: (data) => {
      dispatch(selectOrg(data))
    },
    updateOrg: (data) => {
      dispatch(updateOrg(data))
    },
    deleteOrg: (data) => {
      dispatch(deleteOrg(data))
    },
    createOrg: (data) => {
      dispatch(createOrg(data))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrgPanel);