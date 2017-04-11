import React, {Component, PropTypes} from 'react';
import EditForm from './EditForm';

class OrgList extends Component {
  componentDidMount() {
    const {fetchOrgs} = this.props;
    fetchOrgs();
  }

  render() {
    const {orgs, selectedOrg, selectOrg, updateOrg} = this.props;
    const lineStyle={cursor:'pointer'};
    let orgItems = orgs.map((org) => {
      return (
        <div key={org.id}>
          <li style={lineStyle} onClick={() => selectOrg({id:org.id})}>{org.name}</li>
          {org.id === selectedOrg ? <EditForm onClick={(name) => updateOrg({id:org.id, name:name})}/> : null}
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

OrgList.propTypes = {
  selectedOrg: PropTypes.string.isRequired,
  orgs: PropTypes.array.isRequired,
  selectOrg: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  updateOrg: PropTypes.func.isRequired
};

export default OrgList;