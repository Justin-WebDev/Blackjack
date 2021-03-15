import React, { FunctionComponent, useReducer } from "react";
import { IDealerDispatch, IDealerState } from "./interfaces";
import { BlackJackContext } from "./Context";
import Card from "./Card";

let ace: number = 0;
let firstCard: { [key: string]: string[] } = {};

const reducer = (state: IDealerState, action: IDealerDispatch) => {
  switch (action.type) {
    case "DEAL_CARD":
      let valueAdjustment: number = 0;
      if (state.cards.length < 1) {
        firstCard[`${action.value}`] = action.card;
      }
      if (action.card[state.cards.length - 1] === "A") {
        ace++;
      }
      if (state.value + action.value > 21 && ace > 0) {
        ace--;
        valueAdjustment -= 10;
      }
      return Object.assign({}, state, {
        cards: [...state.cards, action.card],
        value: state.value + action.value + valueAdjustment,
      });
    case "NEW_GAME":
      ace = 0;
      firstCard = {};
      return Object.assign({}, state, { cards: [], value: 0 });
    default:
      return state;
  }
};

const useDealer = () => {
  const [state, dispatch] = useReducer(reducer, {
    cards: [],
    value: 0,
  });

  const Dealer: FunctionComponent = () => (
    <BlackJackContext.Consumer>
      {({ showNewGameButton }) => (
        <div id="dealer">
          <div className="dealer-hand">
            {showNewGameButton ? (
              <div>
                {state.cards.map((card) => (
                  <Card card={card} />
                ))}
                {state.cards.length === 0 ? null : (
                  <div className="hand-value">Value: {state.value}</div>
                )}
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex" }}>
                  <Card card={Object.values(firstCard)[0]} />
                  <span
                    id="card"
                    style={{ backgroundColor: "rebeccapurple" }}
                  ></span>
                </div>
                <div className="hand-value">
                  Value: {Object.keys(firstCard)[0]}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </BlackJackContext.Consumer>
  );

  return [state, Dealer, dispatch] as [
    IDealerState,
    FunctionComponent,
    ({}: IDealerDispatch) => IDealerState
  ];
};

export default useDealer;
