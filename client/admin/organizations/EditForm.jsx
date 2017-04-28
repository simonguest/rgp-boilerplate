import React, {Component, PropTypes} from 'react';

class EditForm extends Component {
  componentDidMount() {
  }

  render() {
    const {updateClick, deleteClick} = this.props;
    return (
      <div>
        <input type="text" ref="nameInput" placeholder="New Name"/>
        <button onClick={() => {updateClick(this.refs.nameInput.value)}}>Update</button>
        <button onClick={() => {deleteClick()}}>Delete</button>
      </div>
    );
  }
}

EditForm.propTypes = {
  updateClick: PropTypes.func.isRequired,
  deleteClick: PropTypes.func.isRequired
};

export default EditForm
