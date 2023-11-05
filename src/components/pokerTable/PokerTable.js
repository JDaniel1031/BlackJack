// PokerTable.js
import React from "react";
import "./PokerTable.css";
import Home from "../home/Home.js";

const PokerTable = () => {
  return (
    <div className="poker-table-container">
      <img
        className="poker-table-image"
        src="https://media.istockphoto.com/id/1147481668/vector/black-jack-table-vector-illustration-eps-10-casino.jpg?s=2048x2048&w=is&k=20&c=gIJ1_K8Ytnp62kU3ETqIlbW-ExhAoJZqR4Qxpa2CxEM="
        alt="Poker Table"
      />
      <div className="home-container">
        <Home />
      </div>
    </div>
  );
};

export default PokerTable;