import React, { FunctionComponent, useContext } from "react";
import { BlackJackContext } from "../Context";

const ChipsAdd: FunctionComponent<{ money: number }> = ({ money }) => {
  const { playerDispatch } = useContext(BlackJackContext);
  const chipAmounts = [
    [5, "red"],
    [25, "green"],
    [50, "orange"],
    [100, "black"],
    [500, "purple"],
    [1000, "gold"],
    [5000, "brown"],
  ];
  return (
    <div id="chips" style={{ display: "flex", flexDirection: "row" }}>
      {chipAmounts.map((chip) => {
        if (chip[0] <= money) {
          return (
            <div
              id="chip"
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
                marginLeft: "5px",
              }}
              onClick={() => {
                playerDispatch({
                  type: "ADD_BET",
                  handIndex: 0,
                  card: ["", ""],
                  value: 0,
                  bet: [Number(chip[0]), chip[1].toString()],
                  aceCount: 0,
                });
              }}
            >
              {chip[0] >= 1000
                ? "$" + chip[0].toString()[0] + "k"
                : `$${chip[0]}`}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default ChipsAdd;
