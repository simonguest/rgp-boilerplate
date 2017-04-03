import React, {Component, PropTypes} from 'react'

class OrgList extends Component {
  componentDidMount() {
    const {fetchOrgs} = this.props;
    fetchOrgs();
  }

  render() {
    const {orgs} = this.props;
    let orgItems = orgs.map((org) => {
      return (
        <div key={org.id}>
          <p>{org.name}</p>
          <a href="#">Edit</a>
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

export default OrgList;