import React from "react";
import "./style.css";

export default function ReverseCounter({ counter }) {
  let timerClass = "";
  if (counter <= 3) {
    timerClass = "red";
  } else if (counter <= 10) {
    timerClass = "orange";
  } else if (counter <= 25) {
    timerClass = "yellow";
  } else {
    timerClass = "green";
  }
  // console.log(timerClass);

  return (
    <div>
      <h1 className={timerClass}>{`Time Left: ${counter}`}</h1>
    </div>
  );
}
