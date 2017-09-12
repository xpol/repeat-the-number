import React, { Component } from 'react';
import cx from 'classnames'
import logo from './logo.svg';
import './App.css';


const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const randomDigit = () => getRandomInt(0, 10)

const group = (array, n) => {
  const grouped = []
  for (var i = 0; i < array.length; i+= n) {
    grouped.push(array.slice(i, i + n))
  }
  return grouped
}


class App extends Component {

  state = {digits: []}

  componentDidMount() {
    this.reset()
  }

  reset = () => {
    const digits = []
    for (var i = 0; i < 3; i++) {
      digits.push(randomDigit())
    }
    this.setState({digits})
  }

  addDigit = () => {
    if (this.state.digits.length >= 80) return

    this.setState(({digits}) => (
      {digits: [...digits, randomDigit()]}
    ))
  }

  removeDigit = () => {
    if (this.state.digits.length <= 3) return

    this.setState(({digits}) => (
      {digits: digits.slice(0, digits.length - 1)}
    ))
  }

  render() {
    const {digits} = this.state

    const grouped = group(digits, 5)
    console.log(grouped.length)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className={cx({hidden:  grouped.length > 5})}>Repeat the Number</h2>
          <div className="count">{digits.length}</div>
        </div>
        <div className={cx("digits", {s: grouped.length > 5, xs: grouped.length > 9, xxs: grouped.length > 11})}>
          {grouped.map((g, i) => <div className={cx("group")} key={i}>
            {g.map((d, k) => <span key={k}>{d}</span>)}
          </div>)}
        </div>
        <div className="buttons">
          <div className="button secondary" onClick={this.reset}>AC</div>
          <div className="button primary" onClick={this.removeDigit}>-</div>
          <div className="button primary" onClick={this.addDigit}>+</div>
        </div>

      </div>
    );
  }
}

export default App;
