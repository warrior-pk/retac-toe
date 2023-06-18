import React, { useState, useEffect } from "react";
import Square from "./square/index";

export default function BigSquare(props) {
  // console.log(props);
  const [state, setState] = useState(Array(9).fill(null));
  const [isXturn, setIsXturn] = useState(true);
  const [winner, setWinner] = useState(null);

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
          return state[a];
        }
      }
      return null;
    };
    if (state) {
      console.log(state);
      const win = calculateWinner();
      if (win != null) {
        setWinner(win);
      }
    }
  }, [state]);

  useEffect(() => {
    // console.log("Winner:", winner);
    props.handleMessage(`Winner is : ${winner}`);
  }, [winner, props]);

  useEffect(() => {
    if (winner) return;
    props.handleMessage(`${isXturn ? "X" : "O"}'s Turn`);
    // eslint-disable-next-line
  }, [isXturn, props]);

  return (
    <div className="big-square">
      <div className="row">
        <Square onClick={() => handleClick(0)} value={state[0]} />
        <Square onClick={() => handleClick(1)} value={state[1]} />
        <Square onClick={() => handleClick(2)} value={state[2]} />
      </div>
      <div className="row">
        <Square onClick={() => handleClick(3)} value={state[3]} />
        <Square onClick={() => handleClick(4)} value={state[4]} />
        <Square onClick={() => handleClick(5)} value={state[5]} />
      </div>
      <div className="row">
        <Square onClick={() => handleClick(6)} value={state[6]} />
        <Square onClick={() => handleClick(7)} value={state[7]} />
        <Square onClick={() => handleClick(8)} value={state[8]} />
      </div>
    </div>
  );
}
