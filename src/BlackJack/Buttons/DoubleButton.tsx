import React, { FunctionComponent } from "react";
import { BlackJackContext } from "../Context";
import { dealCard } from "../helperFunctions";

const DoubleButton: FunctionComponent<{ handIndex: number }> = ({
  handIndex,
}) => (
  <BlackJackContext.Consumer>
    {({ shoe, setShoe, playerDispatch }) => (
      <input
        type="submit"
        className="button"
        value="Double"
        onClick={() => {
          dealCard(shoe, setShoe, playerDispatch, handIndex);
          playerDispatch({
            type: "DOUBLE_DOWN",
            handIndex,
            card: ["", ""],
            value: 0,
            bet: [0, ""], //playerCurrentGame[handIndex].bet * 2,
            aceCount: 0,
          });
        }}
      />
    )}
  </BlackJackContext.Consumer>
);

export default DoubleButton;
