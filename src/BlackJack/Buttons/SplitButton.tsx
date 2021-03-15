import React, { FunctionComponent, useContext } from "react";
import { BlackJackContext } from "../Context";
import { dealCard } from "../helperFunctions";
import { ISplitButton } from "../interfaces";

const SplitButton: FunctionComponent<ISplitButton> = ({ handIndex = 0 }) => {
  const { playerCurrentGame, shoe, setShoe, playerDispatch } = useContext(
    BlackJackContext
  );

  const split = () => {
    const cards = playerCurrentGame[handIndex].cards;
    const aces = cards[0][0] === "A" ? 1 : 0;
    const value =
      cards[0][0] === "A" ? 11 : playerCurrentGame[handIndex].value / 2;
    const bet = playerCurrentGame[handIndex].bet;

    const newHandOne = {
      cards: [cards[0]],
      value,
      bet,
      isStayed: false,
      aceCount: aces,
    };
    const newHandTwo = {
      cards: [cards[1]],
      value,
      bet,
      isStayed: false,
      aceCount: aces,
    };

    const copy = playerCurrentGame.slice();
    copy.splice(handIndex, 1, newHandOne);
    copy.splice(handIndex, 0, newHandTwo);
    playerDispatch({
      type: "SPLIT_CARDS",
      handIndex: 0,
      card: ["", ""],
      value: 0,
      bet: [0, ""],
      aceCount: 0,
      newCardsArray: copy,
    });
    dealCard(shoe, setShoe, playerDispatch, handIndex);
    dealCard(shoe, setShoe, playerDispatch, handIndex + 1);
  };

  return <input type="button" value="split" onClick={() => split()} />;
};

export default SplitButton;
