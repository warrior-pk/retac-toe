import "./style.css";
export default function Square({ value, onClick, lineClass }) {
  return (
    <div onClick={onClick} className={`square ${lineClass}`}>
      {value}
    </div>
  );
}
