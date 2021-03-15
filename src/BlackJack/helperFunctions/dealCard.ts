import { chooseRandomCard } from "./chooseRandomCard";
import { assignCard } from "./assignCard";
import { Dispatch } from "react";

export const dealCard = (
  shoe: number[],
  setShoe: Dispatch<number[]>,
  dispatch: /*({}: IPlayerDispatch) => IPlayerState*/ ({}: any) => any,
  handIndex: number = 0,
  playerOrDealer: string = "player"
): void => {
  const randomCard = chooseRandomCard(shoe.length - 1, shoe, setShoe);
  const [assignedFace, assignedValue] = assignCard(randomCard);

  if (playerOrDealer === "player") {
    dispatch({
      type: "DEAL_CARD",
      handIndex,
      card: assignedFace,
      value: assignedValue,
    });
  } else {
    dispatch({ type: "DEAL_CARD", card: assignedFace, value: assignedValue });
  }
  return;
};
