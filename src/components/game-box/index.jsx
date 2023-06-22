import { useState, useEffect } from "react";
import "./style.css";
import MessageBox from "./message-box/index";
import BigSquare from "./big-square/index";
import HowToPlay from "./how-to-play/index";
import ReverseCounter from "../../utils/ReverseCounter";

function GameBox() {
  const [message, setMessage] = useState("Welcome To Retac-Toe!");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [counter, setCounter] = useState(60);
  const [showBtn, setShowBtn] = useState(true);
  const [showRules, setShowRules] = useState(
    window.innerWidth < 600 ? true : false
  );

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
    <div className="container">
      {gameStarted && !gameEnded && <ReverseCounter counter={counter} />}
      {message !== "" && (
        <MessageBox message={message} show={"show"} gameEnded={gameEnded} />
      )}
      {showBtn && (
        <button onClick={() => startGame()} id="start-btn">
          Start Game
        </button>
      )}
      <div className={`boxy ${gameStarted || gameEnded ? "show" : ""}`}>
        {gameStarted && (
          <BigSquare
            handleMessage={handleMessage}
            gameStarted={gameStarted}
            gameEnded={gameEnded}
            counter={counter}
          />
        )}
      </div>
      {!gameStarted && (
        <>
          <button
            className="how-to-play-btn"
            onClick={() => setShowRules(!showRules)}
          >
            - Game Rules -
          </button>
          <HowToPlay showRules={showRules} />
        </>
      )}
    </div>
  );
}

export default GameBox;
