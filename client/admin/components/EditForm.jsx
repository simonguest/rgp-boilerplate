import React, {PropTypes} from 'react';

const EditForm = ({ selectedOrg }) => (
  <li>
    {selectedOrg}
  </li>
);

EditForm.propTypes = {
  selectedOrg: PropTypes.string.isRequired
};

export default EditForm

// class EditForm extends Component {
//
//   componentDidMount() {
//   }
//
//   updateOrg(id) {
//     //console.log(this.props);
//     ///const {selectedOrg} = this.props;
//     console.log('will be updating org of id: '+id);
//   }
//
//   render() {
//     console.log(this.props);
//     return (
//       <div>
//         <p>Company: {this.props.children.selectedOrg}</p>
//         <input ref="name" type="text" placeholder="Company Name"/>
//         <button onClick={() => this.updateOrg(this.props.children.selectedOrg)}>Update Name</button>
//       </div>
//     );
//   }
// }
//
// export default EditForm;