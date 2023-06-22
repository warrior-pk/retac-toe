import React from "react";
import "./style.css";
const PointTable = ({ XPoint, OPoint, isXturn, gameEnded }) => {
  let XBox = "";
  let OBox = "";
  let pointBack = "";
  if (isXturn) {
    XBox = "X-Box";
    OBox = "";
  } else {
    XBox = "";
    OBox = "O-Box";
  }
  if (gameEnded) {
    XBox = "X-Box";
    OBox = "O-Box";
  }
  return (
    <>
      <table className="table">
        <thead className="table-head">
          <tr className="row">
            <th className={`cell ${XBox}`}>X</th>
            <th className={`cell ${OBox}`}>O</th>
          </tr>
        </thead>
        <tbody className="table-body">
          <tr className="row">
            <td className={`cell point ${pointBack}`}>{XPoint}</td>
            <td className={`cell point ${pointBack}`}>{OPoint}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PointTable;
