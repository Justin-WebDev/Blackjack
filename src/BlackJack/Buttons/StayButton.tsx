import React, { FunctionComponent } from "react";
import { BlackJackContext } from "../Context";

const StayButton: FunctionComponent<{ handIndex: number }> = ({
  handIndex,
}) => (
  <BlackJackContext.Consumer>
    {({ playerDispatch }) => (
      <input
        type="button"
        value="Stay"
        onClick={() => {
          playerDispatch({
            type: "STAY",
            handIndex,
            card: ["", ""],
            value: 0,
            bet: [0, ""],
            aceCount: 0,
          });
        }}
      />
    )}
  </BlackJackContext.Consumer>
);

export default StayButton;
