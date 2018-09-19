import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <button
        className="btn default"
        value={this.props.value}
        onClick={e => this.props.onClick(e)}
        disabled={this.props.disableBtn}
      >
        {this.props.name}
      </button>
    );
  }
}
export default Button;
