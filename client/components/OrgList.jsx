import React, {Component, PropTypes} from 'react'

class OrgList extends Component {
  componentDidMount(){
    const { fetchOrgs } = this.props;
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
        {orgItems}
      </div>
    );
  }
}

export default OrgList;