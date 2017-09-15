import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var _ = require('underscore')

const numbersSegments = [
  '010101101',
  '000001001',
  '010111110',
  '010011011',
  '000111001',
  '010110011',
  '010110111',
  '010001001',
  '010111111',
  '010111011'
]

const numberSegments = [
  {one: ' _ ', two: '| |', three: '|_|'},
  {one: '   ', two: '  |', three: '  |'},
  {one: ' _ ', two: ' _|', three: '|_ '},
  {one: ' _ ', two: ' _|', three: ' _|'},
  {one: '   ', two: '|_|', three: '  |'},
  {one: ' _ ', two: '|_ ', three: ' _|'},
  {one: ' _ ', two: '|_ ', three: '|_|'},
  {one: ' _ ', two: '  |', three: '  |'},
  {one: ' _ ', two: '|_|', three: '|_|'},
  {one: ' _ ', two: '|_|', three: ' _|'},
]

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      number: '',
      numberOut: '',
      digitSize : '',
      lineOne: '',
      lineTwo: '',
      lineThree: '',
      digitsMatrix: [''][''],
      digitsLine: ['']
    };
    this.handleNumberChange = this.handleNumberChange.bind(this);
  }


  handleNumberChange(event){
    var numberEnter = event.target.value;
    var numValues = numberEnter.split(",");

    if (/^[0-9]+\,?[0-9]*$/.test(numberEnter) || /^[0-9]$/.test(numberEnter)) {
      // console.log(numValues);
      if (numValues.length === 2 && numValues[0]>0 && numValues[0]<10){
        this.setState({digitSize: numValues[0]})
        var segmentsMatrix = _.range(numValues[0]).map(function() {
          return _.range(numValues[0]).map(function() {
            return " ";
          })
        })
        var segmentsLine = _.range(numValues[0]*2+1).map(function() {
          return "";
        })
        this.setState({digitsMatrix: segmentsMatrix})
        this.setState({digitsLine: segmentsLine})
        var numberArray = numValues[1].split("");
        this.setState({numberOut: numValues[1]})
        this.fillSegments(numberArray, this.state)
      }
      this.setState({number: numberEnter})
    } else {
      this.setState({numberOut : "Please use the format x,y"})
      // this.setState({number : numberEnter})
    }
  }

  fillSegments(numArray, props){
    props.lineOne = ''
    props.lineTwo = ''
    props.lineThree = ''
    // console.log(props.digitsLine)
    numArray.forEach( function(num) {
      // console.log(numberSegments[num]);
      props.lineOne = props.lineOne + " " + numberSegments[num].one;
      props.lineTwo = props.lineTwo + " " + numberSegments[num].two
      props.lineThree = props.lineThree + " " + numberSegments[num].three
    })
    this.fillSegMatrix(numArray, props)
  }

  fillSegMatrix(numArray, props){
    for (let i = 0; i < props.digitSize*2+1; i++) {
      props.digitsLine[i]="";
    }
    numArray.forEach( function(num) {
      var numberBinary = numbersSegments[num].split("")
      console.log(props.digitSize)
      if (numberBinary[1]==="1"){
        for (let i = 0; i < (props.digitSize*2+1); i++) {
          console.log(i%(props.digitSize*2+1))
          props.digitsMatrix[0][i]= numberBinary[i%(props.digitSize*2+1)]==='0' ? ' ' : '_'
        }
      } else {
        for (let i = 0; i < (props.digitSize*2+1); i++) {
          console.log("array"+i)
          props.digitsMatrix[0][i]=" "
        }
      }
      console.log(props.digitsMatrix)
    })
  }

  render() {

    var lines = [
      <pre className="pre-style">{this.state.lineOne}&nbsp;&nbsp;</pre>,
      <pre className="pre-style">{this.state.lineTwo}&nbsp;&nbsp;</pre>,
      <pre className="pre-style">{this.state.lineThree}&nbsp;&nbsp;</pre>
    ]
    var lines2 = [
      <pre className="pre-style">{this.state.lineOne}&nbsp;&nbsp;</pre>,
      <pre className="pre-style">{this.state.lineTwo}&nbsp;&nbsp;</pre>,
      <pre className="pre-style">{this.state.lineThree}&nbsp;&nbsp;</pre>
    ]

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Lets convert some numbers</h2>
        </div>
        <div className="App-intro">
          <label>
          Number:{' '}
          <input type="text" value={this.state.number} onChange={this.handleNumberChange}/>
          </label>
          <br/>
          <label>{this.state.numberOut}</label>
          <br/>
          <div className="Seven-segments">
            <div>{lines}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
