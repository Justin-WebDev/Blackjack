import React, { FunctionComponent } from "react";

interface ICard {
  card: [string, string];
}

const Card: FunctionComponent<{ card: string[] }> = ({ card }) => {
  const [cardSymbol, suit] = card;
  let emoji;
  let color;
  if (suit === "heart") {
    emoji = "♥️";
    color = "red";
  } else if (suit === "spade") {
    emoji = "♠️";
    color = "black";
  } else if (suit === "club") {
    emoji = "♣️";
    color = "black";
  } else {
    emoji = "♦️";
    color = "red";
  }
  return (
    <span id="card" style={{ color }}>
      <div id="top-card">{cardSymbol}</div>
      <div id="middle-card">{emoji}</div>
      <div id="bottom-card">{cardSymbol}</div>
    </span>
  );
};

export default Card;
