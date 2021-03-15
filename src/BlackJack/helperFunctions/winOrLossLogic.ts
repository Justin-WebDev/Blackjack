import { Dispatch } from "react";
import { IPlayerDispatch } from "../interfaces";

export const winOrLossLogic = (
  playerHandIndex: number,
  playerValue: number,
  dealerValue: number,
  dispatch: Dispatch<IPlayerDispatch>
): void => {
  let type = "";

  if ((dealerValue > playerValue && dealerValue <= 21) || playerValue > 21) {
    type = "DEALER_WINS";
  } else if (
    (dealerValue > 21 && playerValue <= 21) ||
    (dealerValue < playerValue && playerValue <= 21)
  ) {
    type = "PLAYER_WINS";
  } else if (dealerValue === playerValue) {
    type = "PLAYER_DEALER_TIE";
  }

  dispatch({
    type,
    handIndex: playerHandIndex,
    card: ["", ""],
    value: 0,
    bet: [0, ""],
    aceCount: 0,
  });
  return;
};
