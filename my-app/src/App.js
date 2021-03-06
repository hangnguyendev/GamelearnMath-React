import React from 'react';
import Button from '../src/components/Button';
import { setCountReset } from '../src/redux/actions';
import { getCountReset } from '../src/redux/actions';
import { getChooseNumber } from '../src/redux/actions';
import { setChooseNumber } from '../src/redux/actions';
import PropTypes from 'prop-types';

// import { getNumber } from '../src/redux/actions';
import { connect } from 'react-redux';
import resetNumber from './redux/reducers/resetNumber';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],

      random: 4,
      choosenumber: [],
      totalNumber: 4,
      // choosednumber: [],
      // countReset: 5,
      time: {},
      seconds: 11,
      start_game: false,
      reTime: 0,
      end_game: true,
      error: null,
      isLoaded: false,
      items: []
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
    // if (!this.props.choosednumber) {
    //   return;
    // }
    if (this.state.end_game === false) {
      return (
        <div className="start_game">
          <p>
            <h1>You lose</h1>
          </p>
          <button onClick={this.restart}> RESTART GAME </button>
        </div>
      );
    } else if (this.props.choosedNumber.length === 9) {
      clearInterval(this.timer);
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

    this.timer = 0;
    this.setState({ seconds: 11 });
    this.startTimer();
    this.props.setCountReset();
    this.props.setChooseNumber();

    // { countReset: 5 }
    // this.setState({ choosednumber: [] });
    this.setState({ choosenumber: [] });
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

  componentDidMount() {
    fetch('http://5b223119b968350014dcff8b.mockapi.io/api/ve/users')
      .then(res => res.json())
      .then(findresponse => {
        console.log(findresponse);
      });

    // Note: it's important to handle errors here
    // instead of a catch() block so that we don't swallow
    // exceptions from actual bugs in components.

    // console.log(result);
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
    // const newNumber = this.state.choosenumber;
    this.props.getChooseNumber(this.state.choosenumber);
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

        console.log(this.props.choosedNumber, 'hjj');
        if (this.props.choosedNumber.length === 9) {
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

    // console.log(choosenumber, ' rcountReset');
    this.setState({ choosenumber: choosenumber });
    this.setState({ end_game: true });

    return 0;
  };

  resetRandom() {
    if (this.props.resetCount > 0) {
      this.setState({ choosenumber: [] });
      const x = Math.floor(Math.random() * 10 + 1);
      this.setState({ random: x });

      clearInterval(this.timer);
      this.setState({ end_game: true });
      //state
      // this.setState({ countReset: this.state.countReset - 1 });
      // this.setState({ choosenumber: [] });
      this.timer = 0;
      this.setState({ seconds: 11 });
      this.startTimer();
      // this.props.getNumber();

      this.props.getCountReset();
      //dựa vào phần khai báo của mapDispatchToProps để truyền dữ liệu hay điều hướng dữ liệu, hiện tại thì không có dữ liệu nào được truyền vào store cả
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

  showBtn() {
    if (!this.props.choosedNumber) {
      return (
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
      );
    }
    return (
      <div className="button-below">
        {this.state.numbers.map((item, i) => (
          <Button
            className="btn"
            value={item}
            onClick={e => this.onClickBtn(e)}
            name={item}
            disableBtn={
              this.state.choosenumber.indexOf(item) !== -1 ||
              this.props.choosedNumber.indexOf(item) !== -1
            }
          />
        ))}
      </div>
    );
  }

  render() {
    // console.log(items);
    const { error, isLoaded, items } = this.state;
    // if (error) {
    //   return <div>Error: {error.message}</div>;
    // } else if (!isLoaded) {
    //   return <div>Loading...</div>;
    // } else {
    return (
      <div className="content">
        {this.startGame()}
        {this.state.start_game &&
          this.state.end_game && (
            <div>
              {this.startTimer()}
              <button className="timer">Timer: {this.state.time.s}</button>
              <button className="reset">Reset: {this.props.resetCount}</button>
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
                      this.props.choosedNumber.indexOf(item) !== -1
                    }
                  />
                ))}
              </div>
            </div>
          )}
        {this.endGame()}
      </div>
    );
    // return (
    //   <div>
    //     <ul>
    //       {this.state.items.map((item, i) => (
    //         <li>
    //           {item.name} {item.avatar}
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // );
  }
}
// }
const mapStateToProps = state => {
  return {
    resetCount: state.resetNumber.resetCount,
    choosedNumber: state.arrayNumber.arrchoosedNumber
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCountReset: () => dispatch(setCountReset()),
    getCountReset: () => dispatch(getCountReset()),
    // getNumber: () => dispatch(getNumber()),
    getChooseNumber: ownProps => dispatch(getChooseNumber(ownProps)),
    setChooseNumber: () => dispatch(setChooseNumber())
  };
};
App.propTypes = {
  choosedNumber: PropTypes.array
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
