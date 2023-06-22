export default function MessageBox(props) {
  let { message, show } = props;
  let win = "";
  // console.log(show);
  if (message === "X") {
    message = `Winner !`;
    win = "gold";
  } else if (message === "O") {
    message = `Winner !`;
    win = "gold";
  } else if (message === "T") {
    message = `Match Tie!`;
  }
  return (
    <div className={`message-box ${show ? "show" : ""} ${win}`}>
      <h1>{message}</h1>
    </div>
  );
}
