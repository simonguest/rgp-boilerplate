import React, {Component, PropTypes} from 'react';
import EditForm from './EditForm';
import CreateForm from './CreateForm';

class OrgList extends Component {
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

OrgList.propTypes = {
  selectedOrg: PropTypes.string.isRequired,
  orgs: PropTypes.array.isRequired,
  selectOrg: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  updateOrg: PropTypes.func.isRequired,
  deleteOrg: PropTypes.func.isRequired,
  createOrg: PropTypes.func.isRequired
};

export default OrgList;