import React, { useState, useEffect, useCallback } from "react";
import Square from "./square/index";
import PointTable from "./point-table/index";
import "./style.css";

export default function BigSquare({ gameEnded, handleMessage }) {
  const [state, setState] = useState(Array(9).fill(""));
  const [isXturn, setIsXturn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [XPoint, setXpoint] = useState(0);
  const [OPoint, setOpoint] = useState(0);
  const [currLine, setCurrLine] = useState(Array(9).fill(""));
  const [currTouch, setCurrTouch] = useState(-1);
  const [XWinLines, setXWinLines] = useState([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]);
  const [OWinLines, setOWinLines] = useState([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]);
  function renderSquares(colorClassArray) {
    // console.log(colorClassArray);
    setCurrLine(colorClassArray);
  }

  const handleGame = useCallback(() => {
    const stateX = state.map((item) => item === "X");
    const stateO = state.map((item) => item === "O");
    // console.log(isXturn);
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    if (!isXturn) {
      for (let i = 0; i < XWinLines.length; i++) {
        const [a, b, c] = XWinLines[i];
        if (stateX[a] && stateX[b] && stateX[c]) {
          const copyCurrLine = [...currLine];
          copyCurrLine[a] = copyCurrLine[b] = copyCurrLine[c] = "X-line";
          // for (let i = 0; i < winLines.length; i++) {
          //   const [x, y, z] = winLines[i];
          //   if (x === a && y === b && z === c) continue;
          //   if (
          //     copyCurrLine[x] === copyCurrLine[y] &&
          //     copyCurrLine[y] === copyCurrLine[z]
          //   ) {
          //     continue;
          //   } else {
          //     copyCurrLine[x] = copyCurrLine[y] = copyCurrLine[z] = "";
          //   }
          // }
          const newArray = [
            ...XWinLines.slice(0, i),
            ...XWinLines.slice(i + 1),
          ];
          setXpoint(XPoint + 3);
          setXWinLines(newArray);
          renderSquares(copyCurrLine);
        }
      }
    } else {
      for (let i = 0; i < OWinLines.length; i++) {
        const [a, b, c] = OWinLines[i];
        if (stateO[a] && stateO[b] && stateO[c]) {
          const copyCurrLine = [...currLine];
          copyCurrLine[a] = copyCurrLine[b] = copyCurrLine[c] = "O-line";
          // for (let i = 0; i < winLines.length; i++) {
          //   const [x, y, z] = winLines[i];
          //   if (x === a && y === b && z === c) continue;
          //   if (
          //     copyCurrLine[x] === copyCurrLine[y] &&
          //     copyCurrLine[y] === copyCurrLine[z]
          //   ) {
          //     continue;
          //   } else {
          //     copyCurrLine[x] = copyCurrLine[y] = copyCurrLine[z] = "";
          //   }
          // }
          const newArray = [
            ...OWinLines.slice(0, i),
            ...OWinLines.slice(i + 1),
          ];
          setOpoint(OPoint + 3);
          setOWinLines(newArray);
          renderSquares(copyCurrLine);
        }
      }
    }
  }, [OPoint, OWinLines, XPoint, XWinLines, isXturn, state, currLine]);

  function handleClick(i) {
    setCurrTouch(i);

    if (gameEnded) {
      return;
    }
    if ((isXturn && state[i] === "X") || (!isXturn && state[i] === "O")) {
      console.log("Only take other's position");
      return;
    }
    if (state.includes("") && state[i] !== "") {
      console.log("let the board be full");
      return;
    }
    const copyState = [...state];

    copyState[i] = isXturn ? "X" : "O";
    setState(copyState);
    // console.log("handleClick");
    setIsXturn(!isXturn);
  }

  useEffect(() => {
    if (state) {
      // console.log(state);
      handleGame();
    }
  }, [state, handleGame]);

  useEffect(() => {
    const arr = Array(9).fill("dull");
    setState((state) => state.fill(""));
    if (winner) {
      if (winner === "X") {
        arr[0] = arr[2] = arr[4] = arr[6] = arr[8] = "X-line";
      } else if (winner === "O") {
        arr.fill("O-line");
        arr[4] = "dull";
      } else {
        arr[0] = arr[1] = arr[2] = arr[4] = arr[7] = "tie";
      }
      renderSquares(arr);
    }
  }, [winner]);
  useEffect(() => {
    function calculateWinner() {
      if (XPoint > OPoint) return "X";
      else if (XPoint < OPoint) return "O";
      else return "T";
    }
    if (gameEnded) {
      setWinner(calculateWinner());
      handleMessage(calculateWinner());
    }
  }, [gameEnded, XPoint, OPoint, handleMessage]);

  return (
    <>
      <div className="ver-container">
        <div className="big-square">
          <Square
            key={0}
            onClick={() => handleClick(0)}
            value={state[0]}
            lineClass={currLine[0]}
            className={"sq"}
          />
          <Square
            key={1}
            onClick={() => handleClick(1)}
            value={state[1]}
            lineClass={currLine[1]}
            className={"sq"}
          />
          <Square
            key={2}
            onClick={() => handleClick(2)}
            value={state[2]}
            lineClass={currLine[2]}
            className={"sq"}
          />
          <Square
            key={3}
            onClick={() => handleClick(3)}
            value={state[3]}
            lineClass={currLine[3]}
            className={"sq"}
          />
          <Square
            key={4}
            onClick={() => handleClick(4)}
            value={state[4]}
            lineClass={currLine[4]}
            className={"sq"}
          />
          <Square
            key={5}
            onClick={() => handleClick(5)}
            value={state[5]}
            lineClass={currLine[5]}
            className={"sq"}
          />
          <Square
            key={6}
            onClick={() => handleClick(6)}
            value={state[6]}
            lineClass={currLine[6]}
            className={"sq"}
          />
          <Square
            key={7}
            onClick={() => handleClick(7)}
            value={state[7]}
            lineClass={currLine[7]}
            className={"sq"}
          />
          <Square
            key={8}
            onClick={() => handleClick(8)}
            value={state[8]}
            lineClass={currLine[8]}
            className={"sq"}
          />
        </div>
        <PointTable
          XPoint={XPoint}
          OPoint={OPoint}
          isXturn={isXturn}
          gameEnded={gameEnded}
          winner={winner}
        />
      </div>
    </>
  );
}
