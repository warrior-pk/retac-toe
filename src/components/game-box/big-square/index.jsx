import React, { useState, useEffect } from "react";
import Square from "./square/index";

export default function BigSquare(props) {
  // console.log(props);
  const [state, setState] = useState(Array(9).fill(null));
  const [isXturn, setIsXturn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winBox, setWinBox] = useState(Array(9).fill(false));

  function handleClick(i) {
    if (state[i] !== null || winner !== null) return;

    const copyState = [...state];
    copyState[i] = isXturn ? "X" : "O";
    setIsXturn(!isXturn);
    setState(copyState);
  }

  useEffect(() => {
    const calculateWinner = () => {
      const winningLines = [
        [0, 1, 2], // 1st row
        [3, 4, 5], // 2nd row
        [6, 7, 8], // 3rd row
        [0, 3, 6], // 1st column
        [1, 4, 7], // 2nd column
        [2, 5, 8], // 3rd column
        [0, 4, 8], // 1st diagonal
        [2, 4, 6], // 2nd diagonal
      ];
      for (let i = 0; i < winningLines.length; i++) {
        const [a, b, c] = winningLines[i];
        if (state[a] && state[a] === state[b] && state[a] === state[c]) {
          const copyWinBox = [...winBox];
          copyWinBox[a] = copyWinBox[b] = copyWinBox[c] = true;
          setWinBox(copyWinBox);
          return state[a];
        }
      }
      return null;
    };
    if (state) {
      // console.log(state);
      const win = calculateWinner();
      if (win != null) {
        setWinner(win);
      } else {
        const containsNull = state.includes(null);
        if (!containsNull) setWinner("Tie");
      }
    }
    // eslint-disable-next-line
  }, [state]);

  useEffect(() => {
    // console.log("Winner:", winner);
    if (winner === "Tie") props.handleMessage(`Match Tie!`);
    else props.handleMessage(`Winner is : ${winner}`);
  }, [winner, props]);

  useEffect(() => {
    if (winner) return;

    props.handleMessage(`${isXturn ? "X" : "O"}'s Turn`);
    // eslint-disable-next-line
  }, [isXturn, props]);

  function renderSquare(index) {
    let gameOverClass = "";
    if (winner) {
      // console.log(winBox);
      gameOverClass = winBox[index] ? "win-line" : "other-line";
    }
    return (
      <Square
        key={index}
        onClick={() => handleClick(index)}
        value={state[index]}
        gameOverClass={gameOverClass}
        className={"sq"}
      />
    );
  }
  return (
    <div className="container">
      <div className="big-square">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}
