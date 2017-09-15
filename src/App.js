import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const numberSegments = [
  {one: '_', two: '| |', three: '|_|'},
  {one: ' ', two: ' |', three: ' |'},
  {one: '_', two: '_|', three: '|_'},
  {one: '_', two: '_|', three: '_|'},
  {one: ' ', two: '|_|', three: ' |'},
  {one: '_', two: '|_', three: '_|'},
  {one: '_', two: '|_', three: '|_|'},
  {one: '_', two: ' |', three: ' |'},
  {one: '_', two: '|_|', three: '|_|'},
  {one: '_', two: '|_|', three: '_|'},
]

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      number: '',
      numberOut: '',
      lineOne: '',
      lineTwo: '',
      lineThree: ''
    };

    this.handleNumberChange = this.handleNumberChange.bind(this);
  }

  handleNumberChange(event){
    var numberEnter = event.target.value;
    if (!isNaN(numberEnter)) {
      var numberArray = numberEnter.split("");

      this.setState({numberOut: numberEnter})
      this.setState({number: numberEnter})
      this.fillSegments(numberArray, this.state)
    } else {
      this.setState({numberOut : "Only numbers please"})
      var myNumber = numberEnter.replace(/\D/g,'');
      this.setState({number : myNumber})
    }
  }

  fillSegments(numArray, props){
    props.lineOne = ''
    props.lineTwo = ''
    props.lineThree = ''
    numArray.forEach( function(num) {
      // console.log(numberSegments[num]);
      props.lineOne = props.lineOne + " " + numberSegments[num].one;
      props.lineTwo = props.lineTwo + " " + numberSegments[num].two
      props.lineThree = props.lineThree + " " + numberSegments[num].three
    })
  }

  render() {

    var lines = [
      <div>{this.state.lineOne}</div>, <br/>,
      <div>{this.state.lineTwo}</div>, <br/>,
      <div>{this.state.lineThree}</div>
    ]

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
        <label>{this.state.numberOut}</label>
        <br/>
        <br/>
        <div className="Seven-segments">
          <div>{lines}</div>
        </div>
        </p>
      </div>
    );
  }
}

export default App;
