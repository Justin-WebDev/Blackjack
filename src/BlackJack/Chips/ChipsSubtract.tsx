import React, { FunctionComponent, useContext, useEffect } from "react";
import { BlackJackContext } from "../Context";

const ChipsSubtract: FunctionComponent = () => {
  const { playerCurrentGame, playerDispatch, showNewGameButton } = useContext(
    BlackJackContext
  );
  const chip =
    playerCurrentGame[0].bet.chips[playerCurrentGame[0].bet.chips.length - 1];

  return chip ? (
    <button
      id="chipSubtract"
      disabled={!showNewGameButton}
      style={{
        backgroundColor: `${chip[1]}`,
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        lineHeight: "4px",
        border: "2px dashed white",
        boxShadow: "0px 0px 5px black",
        // marginBottom: "10px",

        position: "absolute",
        top: "13%",
        left: "20%",
        zIndex: 999,
      }}
      onClick={() => {
        playerDispatch({
          type: "SUBTRACT_BET",
          handIndex: 0,
          card: ["", ""],
          value: 0,
          bet: [Number(chip[0]), chip[1].toString()],
          aceCount: 0,
        });
      }}
    >
      {chip[0] >= 1000 ? "$" + chip[0].toString()[0] + "k" : `$${chip[0]}`}
    </button>
  ) : null;
};

export default ChipsSubtract;
