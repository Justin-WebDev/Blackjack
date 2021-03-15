import React, { FunctionComponent, useEffect, useState } from "react";
import {
  createDeck,
  createShoe,
  dealCard,
  winOrLossLogic,
} from "./helperFunctions";
import usePlayer from "./usePlayer";
import useDealer from "./useDealer";
import NewGameButton from "./Buttons/NewGameButton";
import { BlackJackContext } from "./Context";
import { navigate, Redirect, RouteComponentProps } from "@reach/router";
import "./_blackjack.scss";
import { getToken, isAuthenticated } from "../auth/utils";

const BlackJack: FunctionComponent<RouteComponentProps> = () => {
  const deck = createDeck();
  const numberOfDecks: number = 6;
  const endOfShoeCard: number = 0.2;
  const [shoe, setShoe] = useState(createShoe(deck, numberOfDecks));
  // const [username, setUsername] = useState("Justin");
  const [
    playerCurrentGame,
    playerMoney,
    { wins, losses, ties }, //playerOverallRecord , DON'T COMMENT OUT
    Player,
    playerDispatch,
  ] = usePlayer();
  const [dealerState, Dealer, dealerDispatch] = useDealer();

  const [showNewGameButton, setShowNewGameButton] = useState(true);

  useEffect(() => {
    if (showNewGameButton) {
      if (shoe.length < Math.floor(52 * numberOfDecks * endOfShoeCard)) {
        /*** RESHUFFLES WHEN SHOE GETS BELOW 25 PERCENT OF CARDS ***/
        setShoe(createShoe(deck, numberOfDecks));
      }
      if (
        playerCurrentGame[0].bet.totalBet > playerMoney ||
        playerCurrentGame[0].bet.totalBet === 0
      ) {
        /** IF BET IS 0 OR HIGHER THAN PLAYERS AVAILABLE MONEY THEN
         * IT WILL DISABLE THE NEW GAME BUTTON UNTIL THE BET IS WITHIN PLAYERS
         * RANGE
         */
        document
          .getElementById("new-game-button")
          ?.setAttribute("disabled", "true");
      } else {
        document.getElementById("new-game-button")?.removeAttribute("disabled");
      }
    }
  }, [showNewGameButton, playerCurrentGame]);

  /* CHECKS IF ALL PLAYERS HANDS HAVE "STAYED".
   * IF THEY ARE:
   *** DETERMINES IF EACH HAND WON OR LOSS.
   *** MAKES NEW GAME BUTTON APPEAR
   */
  useEffect(() => {
    const dealerValue = dealerState.value;
    const isAllHandsStayed = playerCurrentGame.some(
      (hand) => hand.isStayed === false
    );
    if (
      /** IF DEALER HAS 21 ON OPENING HAND
       * THEN ENDS GAME AND COMPARES VALUES WITH PLAYER TO SEE IF THERE IS
       * A TIE
       */
      dealerState.cards.length === 2 &&
      dealerValue === 21 &&
      isAllHandsStayed
    ) {
      playerDispatch({
        type: "STAY",
        handIndex: 0,
        card: ["", ""],
        value: 0,
        bet: [0, ""],
        aceCount: 0,
      });
      return;
    }
    /** IF ALL OF PLAYER HANDS HAVE STAYED (CONFUSING, MAYBE CHANGE VARIABLE NAME LATER) */
    if (!isAllHandsStayed) {
      if (
        playerCurrentGame.length === 1 &&
        playerCurrentGame[0].cards.length === 2 &&
        playerCurrentGame[0].value === 21
      ) {
        setShowNewGameButton(true);
        const handValue = playerCurrentGame[0].value;
        winOrLossLogic(0, handValue, dealerValue, playerDispatch);
        return;
      }
      if (dealerValue < 17) {
        dealCard(shoe, setShoe, dealerDispatch, 0, "dealer");
        return;
      }
      setShowNewGameButton(true);
      playerCurrentGame.forEach((hand, index) => {
        winOrLossLogic(index, hand.value, dealerValue, playerDispatch);
      });
    }
  }, [playerCurrentGame, dealerState]);

  return (
    <div>
      {getToken() ? (
        isAuthenticated() ? (
          <BlackJackContext.Provider
            value={{
              playerCurrentGame,
              playerDispatch,
              showNewGameButton,
              setShowNewGameButton,
              shoe,
              setShoe,
              dealerDispatch,
            }}
          >
            <div id="blackjack">
              <Dealer />
              {showNewGameButton ? <NewGameButton /> : null}
              <Player />
            </div>
          </BlackJackContext.Provider>
        ) : (
          <Redirect to="/login" />
        )
      ) : (
        <Redirect to="/signup" />
      )}
    </div>
  );
};

export default BlackJack;
