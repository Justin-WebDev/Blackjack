import React, { FunctionComponent } from "react";
import { dealCard } from "../helperFunctions";
import { IContext } from "../interfaces";
import { BlackJackContext } from "../Context";

const NewGameButton: FunctionComponent = () => {
  return (
    <BlackJackContext.Consumer>
      {({
        playerCurrentGame,
        playerDispatch,
        setShowNewGameButton,
        shoe,
        setShoe,
        dealerDispatch,
      }: IContext) => (
        <input
          id="new-game-button"
          type="button"
          value="Deal"
          onClick={() => {
            setShowNewGameButton(false);
            playerDispatch({
              type: "NEW_GAME",
              handIndex: 0,
              card: ["", ""],
              value: 0,
              bet: [0, ""],
              aceCount: 0,
            });
            dealerDispatch({ type: "NEW_GAME", card: ["", ""], value: 0 });
            dealCard(shoe, setShoe, playerDispatch);
            dealCard(shoe, setShoe, dealerDispatch, 0, "dealer");
            dealCard(shoe, setShoe, playerDispatch);
            dealCard(shoe, setShoe, dealerDispatch, 0, "dealer");
          }}
        />
      )}
    </BlackJackContext.Consumer>
  );
};

export default NewGameButton;
