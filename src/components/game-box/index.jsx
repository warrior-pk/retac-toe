import "./style.css";
import MessageBox from "./message-box/index";
import BigSquare from "./big-square/index";
import { useState, useEffect } from "react";
import ReverseCounter from "../../utils/ReverseCounter";

function GameBox() {
  const [message, setMessage] = useState("Welcome To Retac-Toe!");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [counter, setCounter] = useState(60);
  const [showBtn, setShowBtn] = useState(true);

  useEffect(() => {
    function handleGameEnd() {
      setGameEnded(true);
    }
    if (gameStarted && counter > 0) {
      const timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    } else if (gameStarted) {
      handleGameEnd();
    }
  }, [counter, gameStarted]);

  const handleMessage = (data) => {
    setMessage(data);
  };

  function startGame() {
    if (gameStarted) return;
    setMessage("");
    setGameStarted(true);
    setShowBtn(false);
  }

  return (
    <>
      {gameStarted && !gameEnded && <ReverseCounter counter={counter} />}
      {message !== "" && (
        <MessageBox message={message} show={"show"} gameEnded={gameEnded} />
      )}
      {showBtn && (
        <button onClick={() => startGame()} id="start-btn">
          Start Game
        </button>
      )}
      <div className={`boxy ${gameStarted ? "show" : ""}`}>
        {gameStarted && (
          <BigSquare
            handleMessage={handleMessage}
            gameStarted={gameStarted}
            gameEnded={gameEnded}
            counter={counter}
          />
        )}
      </div>
    </>
  );
}

export default GameBox;
