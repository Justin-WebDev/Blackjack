import React, { FunctionComponent } from "react";
import { BlackJackContext } from "../Context";
import { dealCard } from "../helperFunctions";

const HitButton: FunctionComponent<{ handIndex: number }> = ({ handIndex }) => (
  <BlackJackContext.Consumer>
    {({ shoe, setShoe, playerDispatch }) => (
      <input
        type="button"
        value="Hit"
        onClick={() => {
          dealCard(shoe, setShoe, playerDispatch, handIndex);
        }}
      />
    )}
  </BlackJackContext.Consumer>
);

export default HitButton;
