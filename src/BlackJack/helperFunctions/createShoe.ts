export const createShoe = (
  deck: Array<number>,
  numberOfDecks: number = 2
): Array<number> => {
  if (numberOfDecks === 1) {
    return deck;
  }
  return createShoe([...deck, ...Array(52).keys()], numberOfDecks - 1);
};
