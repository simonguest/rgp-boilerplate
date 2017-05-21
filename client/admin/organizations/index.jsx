import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectOrg, fetchOrgs, updateOrg, deleteOrg, createOrg, openConfirmation, closeConfirmation } from '../../actions';

import List from './List';
import CreateForm from './CreateForm';

class Organizations extends Component {
  componentDidMount() {
    const { fetchOrgs } = this.props;
    fetchOrgs();
  }

  render() {
    const { orgs, selectedOrg, selectOrg, updateOrg, deleteOrg, createOrg, openConfirmation, closeConfirmation } = this.props;
    return (
      <div>
        <h1 className="page-header">Organizations</h1>
        <List orgs={orgs} selectedOrg={selectedOrg} selectOrg={selectOrg} updateOrg={updateOrg} deleteOrg={deleteOrg} createOrg={createOrg} openConfirmation={openConfirmation} closeConfirmation={closeConfirmation}/>
        <CreateForm createClick={(name) => createOrg({name: name})}/>
        <button>New Organization</button>
      </div>
    );
  }
}

Organizations.propTypes = {
  selectedOrg: PropTypes.string.isRequired,
  orgs: PropTypes.array.isRequired,
  selectOrg: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  updateOrg: PropTypes.func.isRequired,
  deleteOrg: PropTypes.func.isRequired,
  createOrg: PropTypes.func.isRequired,
  openConfirmation: PropTypes.func.isRequired,
  closeConfirmation: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    orgs: state.orgs.items,
    selectedOrg: state.orgs.selectedOrg,
    isFetching: state.orgs.isFetching,
    modal: state.application.modal
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
    },
    openConfirmation: (data) => {
      dispatch(openConfirmation(data))
    },
    closeConfirmation: () => {
      dispatch(closeConfirmation())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Organizations);
