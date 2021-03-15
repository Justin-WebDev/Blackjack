import { Dispatch } from "react";

export interface IPlayerBet {
  totalBet: number;
  chips: [number, string][];
}

export interface IPlayerCurrentGame {
  cards: string[][];
  value: number;
  bet: IPlayerBet;
  isStayed: boolean;
  aceCount: number;
}
export interface IPlayerOverallRecord {
  wins: number;
  losses: number;
  ties: number;
}

export interface IPlayerState {
  currentGame: IPlayerCurrentGame[];
  money: number;
  overallRecord: IPlayerOverallRecord;
}

export interface IPlayerDispatch {
  type: string;
  handIndex: number;
  card: string[];
  value: number;
  bet: [number, string];
  aceCount: number;
  newCardsArray?: {
    cards: string[][];
    value: number;
    bet: IPlayerBet;
    isStayed: boolean;
    aceCount: number;
  }[];
}

export interface INewGame {
  playerDispatch: ({}: IPlayerDispatch) => IPlayerState;
  setHandOver: Dispatch<boolean>;
  shoe: number[];
  setShoe: Dispatch<number[]>;
}

export interface IContext {
  playerCurrentGame: {
    cards: string[][];
    value: number;
    bet: IPlayerBet;
    isStayed: boolean;
    aceCount: number;
  }[];
  playerDispatch: ({}: IPlayerDispatch) => IPlayerState;
  showNewGameButton: boolean;
  setShowNewGameButton: Dispatch<boolean>;
  shoe: number[];
  setShoe: Dispatch<number[]>;
  dealerDispatch: ({}: IDealerDispatch) => IDealerState;
}

export interface ISplitButton {
  handIndex: number;
}

export interface IDealerState {
  cards: string[][];
  value: number;
}

export interface IDealerDispatch {
  type: string;
  card: string[];
  value: number;
}
