import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Default props setup
// Function component
function Square (props) {
    return (
      <button onClick={props.onClick} className="square">
        {props.value}
      </button>
    );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board__row">
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
        </div>
        <div className="board__row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
        </div>
        <div className="board__row">
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      // Adding history so we can undo or go back in time
      history: [{
        squares: Array(9).fill(null),
      }],
      // To make a flip changes everytime X deployed
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length-1];
    const squares = current.squares.slice();
    // to limit the move if someone has win the game
    if (calculateWinner(squares) || squares[i]){
      return;
    }

    // inline conditional, if true, show X, later, show // OPTIMIZE:
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history:history.concat([{
        squares: squares,
      }]),
      // code for giving the opposite of current state
      xIsNext: !this.state.xIsNext,
   });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length-1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner){
      status = 'Winner: '+ winner;
    } else {
      status = 'Next Player: '  + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game__board">
          <Board
            squares={current.squares}
            onClick={(i)=> this.handleClick(i)}
          />
        </div>
        <div className="game__info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares){
  const lines=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length;i++){
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null;
}

// render class Game didalam document dengan id root
ReactDOM.render(<Game />, document.getElementById("root"));
