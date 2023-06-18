export default function MessageBox(props) {
  const { message, show } = props;
  // console.log(show);
  return (
    <div className={`message-box ${show ? "show" : ""}`}>
      <h1>{message}</h1>
    </div>
  );
}
