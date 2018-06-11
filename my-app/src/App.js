import React from 'react';
import Button from '../src/Component/Button';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      a: 9,
      random: 4,
      choosenumber: [],
      totalNumber: 4,
      choosednumber: [],
      countReset: 5,
      time: {},
      seconds: 11,
      start_game: false,
      reTime: 0,
      end_game: true
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);

    this.beginGame = this.beginGame.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.removeButton = this.removeButton.bind(this);
    this.sumOfChooseNumeber = this.sumOfChooseNumeber.bind(this);

    this.restart = this.restart.bind(this);

    this.resetRandom = this.resetRandom.bind(this);
  }

  startGame() {
    if (this.state.start_game === false) {
      return (
        <div className="start_game">
          <button onClick={this.beginGame}> START GAME </button>
        </div>
      );
    }
  }

  endGame() {
    if (this.state.end_game === false) {
      return (
        <div className="start_game">
          <p>
            <h1>You lose</h1>
          </p>
          <button onClick={this.restart}> RESTART GAME </button>
        </div>
      );
    } else if (this.state.choosednumber.length === 9) {
      return (
        <div className="start_game">
          <p>
            <h1>Congratulation </h1>
          </p>
          <button onClick={this.restart}> RESTART GAME </button>
        </div>
      );
    }
  }

  restart() {
    this.setState({ start_game: true });
    this.setState({ end_game: true });
    clearInterval(this.timer);
    this.setState({ choosednumber: [] });
    this.setState({ choosenumber: [] });
    this.timer = 0;
    this.setState({ seconds: 11 });
    this.startTimer();
    this.setState({ countReset: 5 });
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }

  componentWillMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });

    if (this.state.seconds === 0) {
      clearInterval(this.timer);
      this.setState({ end_game: false });
    }
  }

  printStar() {
    let stars = [];
    for (let j = 0; j < this.state.random; j++) {
      stars.push(<i className="fa fa-star fa-spin" />);
    }
    return stars;
  }

  handleClick() {
    this.setState({
      choosednumber: [...this.state.choosednumber, ...this.state.choosenumber]
    });
    if (this.state.choosenumber && this.state.choosenumber.length > 0) {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const total = this.state.choosenumber.reduce(reducer);
      this.setState({ totalNumber: total });

      if (this.state.random === total) {
        const x = Math.floor(Math.random() * 9 + 1);
        this.setState({ random: x });
        this.setState({ choosenumber: [] });

        clearInterval(this.timer);

        this.timer = 0;
        this.setState({ seconds: 11 });

        this.startTimer();
        this.setState({ end_game: true });
        if (this.state.choosednumber.length === 9) {
          this.setState({ end_game: false });
        }
      } else {
        clearInterval(this.timer);
        this.setState({ end_game: false });
      }
    } else {
      const totalNumber = 0;
      this.setState({ totalNumber: totalNumber });
      alert("you didn't choose the number");
    }
    return 0;
  }

  sumOfChooseNumeber() {}

  onClickBtn = e => {
    if (!e.target.value) return 0;
    let number = Number(e.target.value);
    this.setState({ choosenumber: [...this.state.choosenumber, number] });
    this.setState({ end_game: true });
    return 0;
  };

  beginGame() {
    this.setState({ start_game: true });
    this.setState({ end_game: true });
    return true;
  }

  removeButton = e => {
    if (!e.target.value) return;
    const { choosenumber } = this.state;

    choosenumber.splice(choosenumber.indexOf(Number(e.target.value)), 1);

    console.log(choosenumber, ' rcountReset');
    this.setState({ choosenumber: choosenumber });
    this.setState({ end_game: true });

    return 0;
  };

  resetRandom() {
    if (this.state.countReset > 0) {
      this.setState({ choosenumber: [] });
      const x = Math.floor(Math.random() * 10 + 1);
      this.setState({ random: x });
      this.setState({ countReset: this.state.countReset - 1 });
      clearInterval(this.timer);
      this.setState({ end_game: true });

      // this.setState({ choosenumber: [] });
      this.timer = 0;
      this.setState({ seconds: 11 });
      this.startTimer();
      // this.setState({ choosenumber: [] });
    } else {
      clearInterval(this.timer);
      this.setState({ end_game: false });
    }
    return 0;
  }

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
    return (
      <div className="content">
        {this.startGame()}
        {this.state.start_game &&
          this.state.end_game && (
            <div>
              {this.startTimer()}
              <button className="timer">Timer: {this.state.time.s}</button>
              <button className="reset">Reset: {this.state.countReset}</button>
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
                <button className="btn default" onClick={this.resetRandom}>
                  {' '}
                  Reset{' '}
                </button>
              </div>
              <div className="button-below">
                {this.state.numbers.map((item, i) => (
                  <Button
                    className="btn"
                    value={item}
                    onClick={e => this.onClickBtn(e)}
                    name={item}
                    disableBtn={
                      this.state.choosenumber.indexOf(item) !== -1 ||
                      this.state.choosednumber.indexOf(item) !== -1
                    }
                  />
                ))}
              </div>
            </div>
          )}
        {this.endGame()}
      </div>
    );
  }
}

export default App;
