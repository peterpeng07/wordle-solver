import React, { Component } from 'react';
import styles from './styles.module.css'

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
      result: [],
      isLoading: false,
      width: window.innerWidth
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', this.handleWindowSizeChange);
    }
  }

  handleWindowSizeChange() {
    this.setState({ width: window.innerWidth });
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

  deleteLetterIncluded(letter) {
    const list = [...this.state.includeList];

    const updated = list.filter(item => item !== letter)

    this.setState({
      newLetterIncluded: '',
      includeList: updated
    });
  }

  deleteLetterExcluded(letter) {
    const list = [...this.state.excludeList];

    const updated = list.filter(item => item !== letter)

    this.setState({
      newLetterExcluded: '',
      excludeList: updated
    });
  }

  calculate() {
    this.setState({ result: [], isLoading: true })
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
      body: JSON.stringify({
        "first": this.state.first,
        "second": this.state.second,
        "third": this.state.third,
        "fourth": this.state.fourth,
        "fifth": this.state.fifth,
        "includeList": this.state.includeList,
        "excludeList": this.state.excludeList
      }),
      mode: 'cors'
    }

    fetch('https://infinite-castle-67227.herokuapp.com/https://wordle-solver-api.herokuapp.com/', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ result: data, isLoading: false }))
  }


  render() {
    const isMobile = this.state.width < 768;

    return (
      <div className={styles.container}>

        <div className={styles.titleWrapper}>
          <div className={styles.title}>Wordle Solver</div>
          <div className={styles.instruction}>Stuck in Wordle? No problem! This is a simple online application that helps you solve Wordle problems when you just can't possibly think of the next word. Welcome!</div>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.instruction}>Start by entering letters in the correct spot (letters in green tiles) in the text boxes below and leave the unknown ones empty.</div>
          <div className={styles.inputWrapper}>
            <input type="text" className={styles.letterBox} value={this.state.first} maxLength="1" onChange={(e) => this.setState({ first: e.target.value })} />
            <input type="text" className={styles.letterBox} value={this.state.second} maxLength="1" onChange={(e) => this.setState({ second: e.target.value })} />
            <input type="text" className={styles.letterBox} value={this.state.third} maxLength="1" onChange={(e) => this.setState({ third: e.target.value })} />
            <input type="text" className={styles.letterBox} value={this.state.fourth} maxLength="1" onChange={(e) => this.setState({ fourth: e.target.value })} />
            <input type="text" className={styles.letterBox} value={this.state.fifth} maxLength="1" onChange={(e) => this.setState({ fifth: e.target.value })} />
          </div>

          <div className={styles.instruction}>Next, add letters that are in the word but in the wrong spot (letters in yellow tiles), as well as the positions they are not in. Make sure you click the plus button when entering a letter and its position.</div>
          <div className={styles.sectionWrapper}>
            <div className={styles.columnWrapper}>
              <input
                type="text"
                maxLength="1"
                placeholder={isMobile ? 'a' : 'letter'}
                className={styles.letterBox1}
                value={this.state.newLetterIncluded}
                onChange={(e) => this.setState({ newLetterIncluded: e.target.value })}
              />
              <input
                type="number"
                maxLength="1"
                min="1"
                max="5"
                placeholder={isMobile ? '1' : 'position'}
                className={styles.letterBox2}
                value={this.state.position}
                onChange={(e) => this.setState({ position: e.target.value })}
              />
              <button
                className={styles.addButton}
                disabled={this.state.newLetterIncluded === '' || this.state.position === ''}
                onClick={() => this.addLetterIncluded()}
              >
                {isMobile ? 'a' : 'ADD'}
              </button>
            </div>
            <div className={styles.columnWrapper}>
              {this.state.includeList.length === 0 ? <div /> : <div className={styles.instruction}>Letters in the word</div>}
              <ul>
                {this.state.includeList.map(item => {
                  return (
                    <li>
                      {item.letter} [{item.position}]
                      <button
                        className={styles.deleteButton}
                        onClick={() => this.deleteLetterIncluded(item)}
                      >
                        {isMobile ? '-' : 'DEL'}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <div className={styles.instruction}>Finally, add letters that are not in the word (letters in gray tiles). Again, make sure you click the add button when entering a letter.</div>
          <div className={styles.sectionWrapper}>
            <div className={styles.columnWrapper}>
              <input
                type="text"
                maxLength="1"
                placeholder={isMobile ? 'L' : 'letter'}
                className={styles.letterBox1}
                value={this.state.newLetterExcluded}
                onChange={(e) => this.setState({ newLetterExcluded: e.target.value })}
              />
              <button
                className={styles.addButton}
                disabled={this.state.newLetterExcluded === ''}
                onClick={() => this.addLetterExcluded()}
              >
                {isMobile ? '+' : 'ADD'}
              </button>
            </div>
            <div className={styles.columnWrapper}>
              {this.state.excludeList.length === 0 ? <div /> : <div className={styles.instruction}>Letters not in the word</div>}
              <ul>
                {this.state.excludeList.map(item => {
                  return (
                    <li>
                      {item}
                      <button
                        className={styles.deleteButton}
                        onClick={() => this.deleteLetterExcluded(item)}
                      >
                        {isMobile ? '-' : 'DEL'}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <button
            className={styles.submitButton}
            disabled={(this.state.first === '' && this.state.second === '' && this.state.third === '' && this.state.fourth === ''
              && this.state.fifth === '' && this.state.includeList.length === 0 && this.state.excludeList.length === 0) || this.state.isLoading}
            onClick={() => this.calculate()}

          >
            {this.state.isLoading ? 'Solving...' : 'SUBMIT'}
          </button>

          <div className={styles.result}>
            {this.state.result.length === 0 ? <div /> : <div>Possible words</div>}
            <ul>
              {this.state.result.map(item => {
                return (
                  <li>{item}</li>
                )
              })}
            </ul>
          </div>
        </div >
      </div>
    )
  }
}
