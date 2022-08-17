import React from 'react';
import Board from './Board';

export default class Game extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        history:[{
        squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext:true,
      };
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
      console.log(step)
    }
              
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({history: history.concat([{
            squares: squares
        }]),
        stepNumber: history.length,
            xIsNext: !this.state.xIsNext,});
            // console.log(current)
            console.log(history[history.length-1].squares)
            // console.log(squares)
    }

    
    
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      let prev;
      if(this.state.stepNumber>0){
         prev=history[this.state.stepNumber-1];
      }
      else{
        prev=current;
      }
      const winner=calculateWinner(current.squares);
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key ={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
      let status;
      if(winner!=null){
        status="Winner is "+winner+" Congratulations!!!!!";
      }else{
      status = 'Next player: '+(this.state.xIsNext ? 'X' : 'O');
      }
      
      return (
        <div>
          <div className="game-title"> TicTacToe Game</div>
          
        <div className="game">
          <div className="game-board">
          <div className="game-status">{status}</div>
            <Board squares={current.squares} prev={prev.squares}
              onClick={(i) => this.handleClick(i)}/>
          </div>
          <div className="game-info">
            <h1 className="moves">Moves Played</h1>
            <ol>{moves}</ol>
          </div>
        </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }