import React, { Component } from 'react';
import logo from './Pacman.png';
import './App.css';

var _ = require('underscore')

const numbersSegments = [
  '010101111',
  '000001001',
  '010011110',
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
      console.log("HEre");
      console.log(numValues[0].length);
      if (numValues.length === 2 && numValues[0]>0
        && numValues[0]<=10){
        this.setState({digitSize: numValues[0]})
        var segmentsMatrix = _.range(numValues[0]*2+1).map(function() {
          return _.range(numValues[0]*2+1).map(function() {
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
      this.setState({numberOut : "Please use the format size,value"})
      this.setState({number : numberEnter})
    }
  }

  fillSegments(numArray, props){
    props.lineOne = ''
    props.lineTwo = ''
    props.lineThree = ''
    numArray.forEach( function(num) {
      props.lineOne = props.lineOne + " " + numberSegments[num].one;
      props.lineTwo = props.lineTwo + " " + numberSegments[num].two
      props.lineThree = props.lineThree + " " + numberSegments[num].three
    })
    this.fillSegMatrix(numArray, props)
    console.log("this is the lines: ",props.digitsLine)
  }

  // Creates an array with the characters of the number ingressed in 7 segments
  fillSegMatrix(numArray, props){
    for (let i = 0; i < props.digitSize*2+1; i++) {
      props.digitsLine[i]="";
    }
    this.setState({digitsLine: props.digitsLine})
    numArray.forEach( function(num) {
      var numberBinary = numbersSegments[num].split("")
      // First row from seven segments matrix
      if (numberBinary[1]==="1"){
        for (let i = 0; i < (props.digitSize*2); i++) {
          props.digitsMatrix[0][i]= (i%2)===0 ? ' ' : '_'
        }
      } else {
        for (let i = 0; i < (props.digitSize*2+1); i++) {
          props.digitsMatrix[0][i]=" "
        }
      }
      // Rows 2 - n-1 from seven segments matrix
      for (let i = 1; i <= (props.digitSize); i++) {
        props.digitsMatrix[i][0]=numberBinary[3]==='0' ? ' ' : '|'
        props.digitsMatrix[i][(props.digitSize*2)]=numberBinary[5]==='0' ? ' ' : '|'
      }
      // Row n from seven segments matrix
      if (numberBinary[4]==="1"){
        for (let i = 1; i < (props.digitSize*2); i++) {
          props.digitsMatrix[props.digitSize][i]= (i%2)===0 ? ' ' : '_'
        }
      } else {
        for (let i = 1; i < (props.digitSize*2); i++) {
          props.digitsMatrix[props.digitSize][i]=" "
        }
      }
      // Rows n+1 - n*2+1 from seven segments matrix
      let i = props.digitSize;
      i++;
      for (; i <= props.digitSize*2; i++) {
        props.digitsMatrix[i][0]=numberBinary[6]==='0' ? ' ' : '|'
        props.digitsMatrix[i][(props.digitSize*2)]=numberBinary[8]==='0' ? ' ' : '|'
      }
      // Last row from seven segments matrix
      if (numberBinary[7]==="1"){
        for (let i = 1; i < (props.digitSize*2); i++) {
          props.digitsMatrix[props.digitSize*2][i]= (i%2)===0 ? ' ' : '_'
        }
      } else {
        for (let i = 1; i < (props.digitSize*2); i++) {
          props.digitsMatrix[props.digitSize*2][i]=" "
        }
      }
      // Fill the lines strings with theseven segments matrix data
      for (let i = 0; i <= props.digitSize*2; i++) {
        var matrixRow = [];
        for (let j = 0; j <= props.digitSize*2; j++) {
          matrixRow.push(props.digitsMatrix[i][j])
        }
        props.digitsLine[i] = props.digitsLine[i]+'  '+matrixRow.join('');
      }
    })
    this.setState({digitsLine: props.digitsLine})
  }

  listLines() {
    var lines = this.state.digitsLine;
    console.log("abc",lines)
    var listLines = lines.map((line) => <pre className="pre-style">{line}</pre>);
    console.log(listLines)
    return(
      <div className="Seven-segments">{listLines}</div>
    )
  }

  render() {

    var linesSmall = [
      <pre className="pre-style">{this.state.lineOne}&nbsp;&nbsp;</pre>,
      <pre className="pre-style">{this.state.lineTwo}&nbsp;&nbsp;</pre>,
      <pre className="pre-style">{this.state.lineThree}&nbsp;&nbsp;</pre>
    ]

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Lets convert some numbers</h2>
          <br/>
          <input type="text" value={this.state.number} onChange={this.handleNumberChange}/>
        </div>
        <div className="App-intro">
          <br/>
          <label>{this.state.numberOut}</label>
          <br/>
          <div className="Seven-segments">
            <div>{linesSmall}</div>
          </div>
          <div>{this.listLines()}</div>
        </div>
      </div>
    );
  }
}

export default App;
