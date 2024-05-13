import React, { useState } from "react";
import "./TicTacToe.css";
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // Represents the Tic Tac Toe board
  const [isXNext, setIsXNext] = useState(true); // Indicates whether it's X's turn or O's turn
  const [winner, setWinner] = useState(null); // Represents the winner of the game

  // Function to handle click on a box
  const handleClick = (index) => {
    if (winner || board[index]) return; // If there's a winner or the box is already filled, return

    // Create a new copy of the board array
    const newBoard = [...board];
    // Update the board state with X or O based on the current player's turn
    newBoard[index] = isXNext ? "X" : "O";
    // Update the board state
    setBoard(newBoard);
    // Toggle the player's turn
    setIsXNext(!isXNext);
    // Check for winner
    checkWinner(newBoard);
  };

  // Function to check for a winner
  const checkWinner = (currentBoard) => {
    // Define winning combinations
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        setWinner(currentBoard[a]); // Set the winner
        return;
      }
    }
    // If no winner and all boxes are filled, set the winner to 'Draw'
    if (!currentBoard.includes(null)) {
      setWinner("Draw");
    }
  };

  // Function to render a single box
  const renderBox = (index) => {
    return (
      <div className="box" onClick={() => handleClick(index)}>
        {/* Render X or O based on the board state */}
        {board[index] === "X" && <img src={cross_icon} alt="Cross" />}
        {board[index] === "O" && <img src={circle_icon} alt="Circle" />}
      </div>
    );
  };

  // Function to render the Tic Tac Toe board
  const renderBoard = () => {
    return (
      <div className="board">
        <div className="row row1">
          {renderBox(0)}
          {renderBox(1)}
          {renderBox(2)}
        </div>
        <div className="row row2">
          {renderBox(3)}
          {renderBox(4)}
          {renderBox(5)}
        </div>
        <div className="row row3">
          {renderBox(6)}
          {renderBox(7)}
          {renderBox(8)}
        </div>
      </div>
    );
  };

  // Function to handle the reset button click
  const handleReset = () => {
    // Reset all states to their initial values
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="container">
      <h1 className="title">
        Tic Tac Toe Game In <span>React</span>
      </h1>
      {renderBoard()}
      {winner && (
        <div className="winner">
          {winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`}
        </div>
      )}
      <button className="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
