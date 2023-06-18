import "./style.css";
export default function Square(props) {
  return (
    <div onClick={props.onClick} className={`square ${props.gameOverClass}`}>
      {props.value}
    </div>
  );
}
