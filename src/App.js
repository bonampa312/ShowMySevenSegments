import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {number: ''};

    this.handleNumberChange = this.handleNumberChange.bind(this);
  }

  handleNumberChange(event){
    this.setState({number: event.target.value})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Lets convert some numbers</h2>
        </div>
        <p className="App-intro">
        <label>
        Number:
        <input type="text" value={this.state.number} onChange={this.handleNumberChange}/>
        </label>
        <br/>
        <label>{this.state.number}</label>
        </p>
      </div>
    );
  }
}
function SevenSegmentsNumber(props){
  return <h1>Your number is {props.number}</h1>
}

export default App;
