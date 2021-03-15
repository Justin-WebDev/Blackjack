import { Dispatch } from "react";

export const chooseRandomCard = (
  shoeLength: number,
  shoe: number[],
  setShoe: Dispatch<number[]>
): number => {
  const randomCard = Math.floor(Math.random() * shoeLength);
  const card = shoe[randomCard];
  shoe.splice(randomCard, 1);
  setShoe(shoe);
  return card;
};
