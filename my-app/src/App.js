import React, { Component } from 'react';
import Button from '../src/Component/Button';
// import { Provider as AlertProvider } from 'react-alert';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      a: 10,
      random: 4,
      choosenumber: [],
      totalNumber: 4,
      choosednumber: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.removeButton = this.removeButton.bind(this);
    this.sumOfChooseNumeber = this.sumOfChooseNumeber.bind(this);
    this.handleClick();
  }

  printStar = () => {
    let stars = [];
    for (let j = 0; j < this.state.random; j++) {
      stars.push(<i className="fa fa-star fa-spin" />);
    }
    return stars;
  };

  handleClick() {
    this.setState({
      choosednumber: [...this.state.choosednumber, this.state.choosenumber]
    });
    if (this.state.choosenumber && this.state.choosenumber.length > 0) {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const total = this.state.choosenumber.reduce(reducer);
      this.setState({ totalNumber: total });
      console.log(total);
      if (this.state.random === total) {
        const random = this.state.random;
        const x = Math.floor(Math.random() * 10 + 1);
        this.setState({ random: x });
        this.setState({ choosenumber: [] });
      } else {
        alert('you lose');
      }
    } else {
      const totalNumber = 0;
      this.setState({ totalNumber: totalNumber });
      // alert("you lose");
    }
  }

  sumOfChooseNumeber() {}

  onClickBtn = e => {
    let number = parseInt(e.target.value);
    this.setState({ choosenumber: [...this.state.choosenumber, number] });

    return 0;
  };

  removeButton = e => {
    let number = e.target.value;
    let a = this.state.choosenumber.indexOf(number);
    this.state.choosenumber.splice(a, 1);
    this.state.choosednumber.splice(a, 1);
    this.setState({ choosenumber: this.state.choosenumber });
    this.setState({
      choosednumber: [...this.state.choosednumber, this.state.choosenumber]
    });
  };

  renderChooseButton() {
    return (
      <div>
        {this.state.choosenumber.map(item => {
          return (
            <button
              type="button"
              className="btn btn-default"
              value={item}
              onClick={e => this.removeButton(e)}
            >
              {item}
            </button>
          );
        })}
      </div>
    );
  }

  render() {
    console.log(this.state.totalNumber, 'total number');
    console.log(this.state.random, 'rand');
    console.log(this.state.choosednumber, ' number');
    return (
      <div>
        <div className="left-content" id="left">
          {this.printStar(this.state.random)}
        </div>

        <div className="right-content" id="right">
          {this.renderChooseButton()}
        </div>

        <div className="center">
          <button className="btn default" onClick={this.handleClick}>
            {' '}
            ={' '}
          </button>
          <button className="btn default"> Reset </button>
        </div>
        <div className="button-below">
          {this.state.numbers.map((item, i) => (
            <Button
              className="btn"
              value={item}
              onClick={e => this.onClickBtn(e)}
              name={item}
              disableBtn={this.state.choosenumber.indexOf(item) !== -1}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
