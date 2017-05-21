import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectOrg, fetchOrgs, updateOrg, deleteOrg, createOrg, openConfirmation, closeConfirmation } from '../../actions';

import EditForm from './EditForm';
import CreateForm from './CreateForm';

class List extends Component {

  render() {
    const { orgs, selectedOrg, selectOrg, updateOrg, deleteOrg, createOrg, openConfirmation, closeConfirmation } = this.props;
    const lineStyle = { cursor: 'pointer' };
    let orgItems = orgs.map((org) => {
      let deleteModal = () => {
        openConfirmation({
          title: 'Delete Organization?',
          message: `Delete the organization, "${org.name}"?`,
          onDismiss: closeConfirmation,
          onConfirm: () => {
            deleteOrg({ id: org.id });
            closeConfirmation();
          }
        })
      };
      return (
        <div key={org.id}>
          <li style={lineStyle} onClick={() => selectOrg({id: org.id})}>{org.name} ({org.usercount} user{org.usercount > 1 ? 's' : ''})</li>
          {org.id === selectedOrg ? <EditForm updateClick={(name) => updateOrg({id: org.id, name: name})} deleteClick={deleteModal} /> : null }
        </div>
      );
    });
    return (
      <div>
        {orgItems}
      </div>
    );
  }
}

List.propTypes = {
  selectedOrg: PropTypes.string.isRequired,
  orgs: PropTypes.array.isRequired,
  selectOrg: PropTypes.func.isRequired,
  updateOrg: PropTypes.func.isRequired,
  deleteOrg: PropTypes.func.isRequired,
  createOrg: PropTypes.func.isRequired,
  openConfirmation: PropTypes.func.isRequired,
  closeConfirmation: PropTypes.func.isRequired
};

export default List;