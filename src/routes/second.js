import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class Second extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newLetter: '',
      includeList: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ newLetter: event.target.value });
  }

  addLetter() {
    const newLetter = {
      id: 1 + Math.random(),
      value: this.state.newLetter.slice()
    }

    const list = [...this.state.includeList];

    list.push(newLetter);

    this.setState({
      newLetter: '',
      includeList: list
    });
  }

  deleteLetter(id) {
    const list = [...this.state.includeList];

    const updated = list.filter(item => item.id !== id)

    this.setState({
      newLetter: '',
      includeList: updated
    });
  }

  render() {
    return (
      <div>
        <div>Letters in the word</div>
        <input
          type="text"
          value={this.state.newLetter}
          onChange={this.handleChange}
        />
        <button onClick={() => this.addLetter()}>add</button>

        <br />
        <ul>
          {this.state.includeList.map(item => {
            return (
              <li key={item.id}>
                {item.value}
                <button onClick={() => this.deleteLetter(item.id)}>
                  X
                </button>
              </li>
            )
          })}
        </ul>

        <Link to='/exclude'>Next</Link >
      </div >
    )
  }
}