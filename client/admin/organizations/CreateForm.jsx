import React, {Component, PropTypes} from 'react';

class CreateForm extends Component {

  render() {
    const {createClick} = this.props;
    return (
      <div>
        <h3>Create New Org</h3>
        <input type="text" ref="nameInput" placeholder="New Name"/>
        <button onClick={() => {createClick(this.refs.nameInput.value)}}>Create</button>
      </div>
    );
  }
}

CreateForm.propTypes = {
  createClick: PropTypes.func.isRequired
};

export default CreateForm