import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
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
