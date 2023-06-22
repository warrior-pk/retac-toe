import React from "react";
import "./style.css";
const HowToPlay = ({ showRules }) => {
  console.log(showRules);
  return (
    showRules && (
      <div className="rule-box">
        <ul className="rules">
          <li className="odd">It's your tic-tac-toe untill board is filled.</li>
          <li className="even">Magic!, you can change other's square now.</li>
          <li className="odd">You get 3 points for every unique lines.</li>
          <li className="even">Game ends when the time is up.</li>
          <li className="odd">Winner is announced!</li>
        </ul>
      </div>
    )
  );
};

export default HowToPlay;
