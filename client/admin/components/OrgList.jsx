import React, {Component, PropTypes} from 'react';
import EditForm from './EditForm';

class OrgList extends Component {
  componentDidMount() {
    const {fetchOrgs} = this.props;
    fetchOrgs();
  }

  render() {
    const {orgs, selectedOrg, selectOrg} = this.props;
    let orgItems = orgs.map((org) => {
      return (
        <div key={org.id}>
          <p>{org.name}</p>
          <button onClick={() => selectOrg({id:org.id})}>Select</button>
        </div>
      );
    });
    return (
      <div>
        {orgItems}
        Selected: {selectedOrg}
      </div>
    );
  }
}

OrgList.propTypes = {
  selectedOrg: PropTypes.string.isRequired,
  orgs: PropTypes.array.isRequired,
  selectOrg: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default OrgList;