import React, { Component } from 'react';
// import { Link } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first: '',
      second: '',
      third: '',
      fourth: '',
      fifth: '',
      newLetterIncluded: '',
      position: '',
      includeList: [],
      newLetterExcluded: '',
      excludeList: [],
      result: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ newLetterIncluded: event.target.value });
  }

  addLetterIncluded() {
    const newLetter = {
      letter: this.state.newLetterIncluded.slice(),
      position: this.state.position * 1
    }

    const list = [...this.state.includeList];

    list.push(newLetter);

    this.setState({
      newLetterIncluded: '',
      position: '',
      includeList: list
    });
  }

  addLetterExcluded() {
    const list = [...this.state.excludeList];

    list.push(this.state.newLetterExcluded);

    this.setState({
      newLetterExcluded: '',
      excludeList: list
    });
  }

  deleteLetterIncluded(id) {
    const list = [...this.state.includeList];

    const updated = list.filter(item => item.id !== id)

    this.setState({
      newLetterIncluded: '',
      includeList: updated
    });
  }

  deleteLetterExcluded(id) {
    const list = [...this.state.excludeList];

    const updated = list.filter(item => item.id !== id)

    this.setState({
      newLetterExcluded: '',
      excludeList: updated
    });
  }

  calculate() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "first": this.state.first,
        "second": this.state.second,
        "third": this.state.third,
        "fourth": this.state.fourth,
        "fifth": this.state.fifth,
        "includeList": this.state.includeList,
        "excludeList": this.state.excludeList
      })
    }

    console.log(requestOptions.body)

    fetch('https://infinite-castle-67227.herokuapp.com/https://wordle-solver-api.herokuapp.com/', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ result: data }))

    // this.setState({
    //   first: '?',
    //   second: '?',
    //   third: '?',
    //   fourth: '?',
    //   fifth: '?',
    //   newLetterIncluded: '',
    //   position: '',
    //   includeList: [],
    //   newLetterExcluded: '',
    //   excludeList: []
    // });
  }

  render() {
    return (
      <div>
        <div>Wordle Solver</div>

        <div>
          <input type="text" value={this.state.first} onChange={(e) => this.setState({ first: e.target.value })} />
          <input type="text" value={this.state.second} onChange={(e) => this.setState({ second: e.target.value })} />
          <input type="text" value={this.state.third} onChange={(e) => this.setState({ third: e.target.value })} />
          <input type="text" value={this.state.fourth} onChange={(e) => this.setState({ fourth: e.target.value })} />
          <input type="text" value={this.state.fifth} onChange={(e) => this.setState({ fifth: e.target.value })} />
        </div>

        <div>
          <div>Letters in the word</div>
          <input
            type="text"
            value={this.state.newLetterIncluded}
            onChange={(e) => this.setState({ newLetterIncluded: e.target.value })}
          />
          <input
            type="text"
            value={this.state.position}
            onChange={(e) => this.setState({ position: e.target.value })}
          />
          <button onClick={() => this.addLetterIncluded()}>add</button>
          <br />
          <ul>
            {this.state.includeList.map(item => {
              return (
                <li>
                  letter: {item.letter}
                  <br />
                  position: {item.position}
                  <button onClick={() => this.deleteLetterIncluded(item.id)}>
                    X
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          <div>Letters not in the word</div>
          <input
            type="text"
            value={this.state.newLetterExcluded}
            onChange={(e) => this.setState({ newLetterExcluded: e.target.value })}
          />
          <button onClick={() => this.addLetterExcluded()}>add</button>
          <br />
          <ul>
            {this.state.excludeList.map(item => {
              return (
                <li>
                  {item}
                  <button onClick={() => this.deleteLetterExcluded(item.id)}>
                    X
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <button onClick={() => this.calculate()}>SUBMIT</button>

        <div>
          <div>Possible words</div>
          <ul>
            {this.state.result.map(item => {
              return (
                <li>{item}</li>
              )
            })}
          </ul>
        </div>
      </div >
    )
  }
}
