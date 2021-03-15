import React, { FunctionComponent, useReducer } from "react";
import BettingCircle from "./BettingCircle";
import DoubleButton from "./Buttons/DoubleButton";
import HitButton from "./Buttons/HitButton";
import SplitButton from "./Buttons/SplitButton";
import StayButton from "./Buttons/StayButton";
import Card from "./Card";
import ChipsAdd from "./Chips/ChipsAdd";
import ChipsSubtract from "./Chips/ChipsSubtract";
import { BlackJackContext } from "./Context";
import {
  IPlayerCurrentGame,
  IPlayerDispatch,
  IPlayerOverallRecord,
  IPlayerState,
} from "./interfaces";

let winOrLossElementBackGround: { [key: string]: string } = {};

const reducer = (state: IPlayerState, action: IPlayerDispatch) => {
  const stateCopy = state.currentGame.slice();
  switch (action.type) {
    case "DEAL_CARD":
      /** ADDS TO ACE COUNT IF NEW CARD IS AN ACE */
      let ace = 0;
      const currentHand = stateCopy[action.handIndex];
      if (action.card[0] === "A") {
        ace++;
      }
      if (
        /** IF NEW CARD WILL TAKE PLAYER ABOVE 21 AND PLAYER HAS AN ACE
         * THEN WILL SUBTRACT ONE FROM ACE COUNT AND 10 FROM HAND VALUE
         */
        action.value + currentHand.value > 21 &&
        currentHand.aceCount + ace > 0
      ) {
        currentHand.value -= 10;
        currentHand.aceCount--;
      } else if (
        /** IF NEW CARD TAKES PLAYER ABOVE 21 AND PLAYER HAS NO ACES
         * THEN SETS CURRENT HAND TO "ISSTAYED" TO END THAT HANDS TURN
         */
        action.value + currentHand.value > 21 &&
        currentHand.aceCount + ace < 1
      ) {
        currentHand.isStayed = true;
      }
      stateCopy.splice(action.handIndex, 1, {
        cards: [...currentHand.cards, action.card],
        value: currentHand.value + action.value,
        bet: currentHand.bet,
        isStayed: currentHand.isStayed,
        aceCount: currentHand.aceCount + ace,
      });
      return Object.assign({}, state, {
        currentGame: stateCopy,
      });
    case "NEW_GAME":
      winOrLossElementBackGround = {};
      return Object.assign({}, state, {
        currentGame: [
          {
            cards: [],
            value: 0,
            bet: state.currentGame[0].bet,
            isStayed: false,
            aceCount: 0,
          },
        ],
        money: state.money - state.currentGame[0].bet.totalBet,
      });
    case "DEALER_WINS":
      winOrLossElementBackGround[`${action.handIndex}`] = "rgba(255, 0, 0, .6)";
      return Object.assign({}, state, {
        overallRecord: {
          wins: state.overallRecord.wins,
          losses: state.overallRecord.losses + 1,
          ties: state.overallRecord.ties,
        },
      });
    case "SPLIT_CARDS":
      return Object.assign({}, state, {
        currentGame: action.newCardsArray,
        money: state.money - state.currentGame[0].bet.totalBet,
      });
    case "STAY":
      stateCopy.splice(action.handIndex, 1, {
        cards: state.currentGame[action.handIndex].cards,
        value: state.currentGame[action.handIndex].value,
        bet: state.currentGame[action.handIndex].bet,
        isStayed: true,
        aceCount: state.currentGame[action.handIndex].aceCount,
      });
      return Object.assign({}, state, {
        currentGame: stateCopy,
      });
    case "PLAYER_WINS":
      winOrLossElementBackGround[`${action.handIndex}`] =
        "rgba(0, 255, 0, .35)";
      return Object.assign({}, state, {
        money:
          state.money + state.currentGame[action.handIndex].bet.totalBet * 2,
        overallRecord: {
          wins: state.overallRecord.wins + 1,
          losses: state.overallRecord.losses,
          ties: state.overallRecord.ties,
        },
      });
    case "PLAYER_DEALER_TIE":
      winOrLossElementBackGround[`${action.handIndex}`] = "";
      return Object.assign({}, state, {
        money: state.money + state.currentGame[action.handIndex].bet.totalBet,
        overallRecord: {
          wins: state.overallRecord.wins,
          losses: state.overallRecord.losses,
          ties: state.overallRecord.ties + 1,
        },
      });
    case "SUBTRACT_BET":
      winOrLossElementBackGround[0] = "";
      let betChanges = action.bet;
      if (state.currentGame[0].bet.totalBet - betChanges[0] < 0) {
        return state;
      }
      return Object.assign({}, state, {
        currentGame: [
          {
            cards: [],
            value: 0,
            bet: {
              totalBet:
                state.currentGame[action.handIndex].bet.totalBet -
                betChanges[0],
              chips: state.currentGame[action.handIndex].bet.chips.slice(
                0,
                state.currentGame[action.handIndex].bet.chips.length - 1
              ),
            },
            isStayed: false,
            aceCount: 0,
          },
        ],
      });
    case "ADD_BET":
      winOrLossElementBackGround[0] = "";
      let betChange = action.bet;
      if (
        /** IF BET CHANGE WILL MAKE BET GO BELOW 0 THEN IT WON'T LET IT DO IT
         * IF BET CHANGE IS GREATER THAN PLAYERS TOTAL MONEY THEN IT WON'T HAPPEN
         */
        state.money <
        state.currentGame[0].bet.totalBet + betChange[0]
      ) {
        return state; // THIS MIGHT CAUSE PROBLEMS
      }
      return Object.assign({}, state, {
        currentGame: [
          {
            cards: [],
            value: 0,
            bet: {
              totalBet:
                state.currentGame[action.handIndex].bet.totalBet + betChange[0],
              chips: [
                ...state.currentGame[action.handIndex].bet.chips,
                betChange,
              ],
            },
            isStayed: false,
            aceCount: 0,
          },
        ],
      });
    case "DOUBLE_DOWN":
      stateCopy.splice(action.handIndex, 1, {
        cards: state.currentGame[action.handIndex].cards,
        value: state.currentGame[action.handIndex].value,
        bet: {
          totalBet: state.currentGame[action.handIndex].bet.totalBet * 2,
          chips: [
            ...state.currentGame[action.handIndex].bet.chips,
            ...state.currentGame[action.handIndex].bet.chips,
          ],
        },
        isStayed: true,
        aceCount: state.currentGame[action.handIndex].aceCount,
      });
      return Object.assign({}, state, {
        currentGame: stateCopy,
        money: state.money - state.currentGame[action.handIndex].bet.totalBet,
      });
    default:
      return state;
  }
};

const usePlayer = () => {
  const [{ currentGame, money, overallRecord }, dispatch] = useReducer(
    reducer,
    {
      currentGame: [
        {
          cards: [],
          value: 0,
          bet: { totalBet: 0, chips: [] },
          isStayed: false,
          aceCount: 0,
        },
      ],
      money: 1000, // HARD CODED MONEY PLAYER STARTS WITH
      overallRecord: { wins: 0, losses: 0, ties: 0 },
    }
  );

  const Player: FunctionComponent = () => (
    <BlackJackContext.Consumer>
      {({ showNewGameButton }) => (
        <div id="player">
          {currentGame.map((hand: IPlayerCurrentGame, index: number) => {
            return (
              <div
                id={`hand${index}`}
                // className="hand"
                style={{
                  backgroundColor: `${winOrLossElementBackGround[index]}`,
                  marginTop: "5px",
                }}
              >
                {hand.cards.length === 0 ? null : (
                  <div className="hand-value">Value: {hand.value}</div>
                )}
                <div className="cards">
                  {hand.cards.map((card) => (
                    <Card card={card} />
                  ))}
                </div>
                <div id={`buttons${index}`} className="buttons">
                  {hand.cards.length >= 2 && !hand.isStayed ? (
                    <>
                      <HitButton handIndex={index} />
                      <StayButton handIndex={index} />
                    </>
                  ) : null}
                  {hand.cards.length === 2 &&
                  hand.bet.totalBet <= money &&
                  !hand.isStayed ? (
                    <DoubleButton handIndex={index} />
                  ) : null}
                  {hand.cards.length === 2 &&
                  hand.cards[0][0] === hand.cards[1][0] &&
                  !hand.isStayed &&
                  hand.bet.totalBet <= money ? (
                    <SplitButton handIndex={index} />
                  ) : null}
                </div>
                <div id="hand-info">
                  <div id="hand-bet">Bet: ${hand.bet.totalBet}</div>
                  {/* <ChipsSubtract /> */}
                  <BettingCircle />
                </div>
              </div>
            );
          })}
          {showNewGameButton ? (
            <div>
              <ChipsAdd money={money} />
            </div>
          ) : null}

          <div>
            <div id="chips-stats">
              <div className="chips">Total Chips: ${money}</div>
              <div className="stats">
                Wins: {overallRecord.wins} Losses: {overallRecord.losses} Ties:{" "}
                {overallRecord.ties}
              </div>
            </div>
          </div>
        </div>
      )}
    </BlackJackContext.Consumer>
  );
  return [currentGame, money, overallRecord, Player, dispatch] as [
    IPlayerCurrentGame[],
    number,
    IPlayerOverallRecord,
    FunctionComponent,
    ({}: IPlayerDispatch) => IPlayerState
  ];
};

export default usePlayer;
