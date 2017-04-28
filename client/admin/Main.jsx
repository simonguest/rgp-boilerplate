import React, {Component, PropTypes} from 'react';

class Main extends Component {

  render() {
    return (
        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            {this.props.children}
        </div>
    );
  }
}

Main.propTypes = {
};

export default Main;