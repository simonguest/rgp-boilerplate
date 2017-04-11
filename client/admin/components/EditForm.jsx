import React, {Component, PropTypes} from 'react';

class EditForm extends Component {
  componentDidMount() {
  }

  render() {
    const {onClick} = this.props;
    return (
      <div>
        <input type="text" ref="nameInput" placeholder="New Name"/>
        <button onClick={() => {onClick(this.refs.nameInput.value)}}>Update</button>
      </div>
    );
  }
}

EditForm.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default EditForm