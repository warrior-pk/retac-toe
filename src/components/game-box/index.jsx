import "./style.css";
import MessageBox from "./message-box/index";
import BigSquare from "./big-square/index";
import { useState } from "react";

function GameBox() {
  const [message, setMessage] = useState("Welcome to retac-toe!");
  const [gameStarted, setGameStarted] = useState(false);
  const handleMessage = (data) => {
    setMessage(data);
  };
  function startGame() {
    if (gameStarted) return;
    setGameStarted(true);
  }

  return (
    <div>
      <MessageBox message={message} show={"show"} />
      {!gameStarted && (
        <button onClick={() => startGame()} id="start-btn">
          Start Game
        </button>
      )}
      <div className={`boxy ${gameStarted ? "show" : ""}`}>
        {gameStarted && <BigSquare handleMessage={handleMessage} />}
      </div>
    </div>
  );
}

export default GameBox;
