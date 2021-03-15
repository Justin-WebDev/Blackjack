export const assignCard = (card: number): [string[], number] => {
  if (card < 24) {
    if (card < 12) {
      if (card < 4) {
        if (card === 0) {
          return [["A", "spade"], 11];
        } else if (card === 1) {
          return [["A", "club"], 11];
        } else if (card === 2) {
          return [["A", "heart"], 11];
        } else if (card === 3) {
          return [["A", "diamond"], 11];
        }
      } else if (card > 7) {
        if (card === 8) {
          return [["3", "spade"], 3];
        } else if (card === 9) {
          return [["3", "club"], 3];
        } else if (card === 10) {
          return [["3", "heart"], 3];
        } else if (card === 11) {
          return [["3", "diamond"], 3];
        }
      } else {
        if (card === 4) {
          return [["2", "spade"], 2];
        } else if (card === 5) {
          return [["2", "club"], 2];
        } else if (card === 6) {
          return [["2", "heart"], 2];
        } else if (card === 7) {
          return [["2", "diamond"], 2];
        }
      }
    } else {
      if (card < 16) {
        if (card === 12) {
          return [["4", "spade"], 4];
        } else if (card === 13) {
          return [["4", "club"], 4];
        } else if (card === 14) {
          return [["4", "heart"], 4];
        } else if (card === 15) {
          return [["4", "diamond"], 4];
        }
      } else if (card > 19) {
        if (card === 20) {
          return [["6", "spade"], 6];
        } else if (card === 21) {
          return [["6", "club"], 6];
        } else if (card === 22) {
          return [["6", "heart"], 6];
        } else if (card === 23) {
          return [["6", "diamond"], 6];
        }
      } else {
        if (card === 16) {
          return [["5", "spade"], 5];
        } else if (card === 17) {
          return [["5", "club"], 5];
        } else if (card === 18) {
          return [["5", "heart"], 5];
        } else if (card === 19) {
          return [["5", "diamond"], 5];
        }
      }
    }
  } else {
    if (card < 36) {
      if (card < 28) {
        if (card === 24) {
          return [["7", "spade"], 7];
        } else if (card === 25) {
          return [["7", "club"], 7];
        } else if (card === 26) {
          return [["7", "heart"], 7];
        } else if (card === 27) {
          return [["7", "diamond"], 7];
        }
      } else if (card > 31) {
        if (card === 32) {
          return [["9", "spade"], 9];
        } else if (card === 33) {
          return [["9", "club"], 9];
        } else if (card === 34) {
          return [["9", "heart"], 9];
        } else if (card === 35) {
          return [["9", "diamond"], 9];
        }
      } else {
        if (card === 28) {
          return [["8", "spade"], 8];
        } else if (card === 29) {
          return [["8", "club"], 8];
        } else if (card === 30) {
          return [["8", "heart"], 8];
        } else if (card === 31) {
          return [["8", "diamond"], 8];
        }
      }
    } else {
      if (card < 40) {
        if (card === 36) {
          return [["10", "spade"], 10];
        } else if (card === 37) {
          return [["10", "club"], 10];
        } else if (card === 38) {
          return [["10", "heart"], 10];
        } else if (card === 39) {
          return [["10", "diamond"], 10];
        }
      } else if (card > 47) {
        if (card === 48) {
          return [["K", "spade"], 10];
        } else if (card === 49) {
          return [["K", "club"], 10];
        } else if (card === 50) {
          return [["K", "heart"], 10];
        } else if (card === 51) {
          return [["K", "diamond"], 10];
        }
      } else if (card > 43) {
        if (card === 44) {
          return [["Q", "spade"], 10];
        } else if (card === 45) {
          return [["Q", "club"], 10];
        } else if (card === 46) {
          return [["Q", "heart"], 10];
        } else if (card === 47) {
          return [["Q", "diamond"], 10];
        }
      } else {
        if (card === 40) {
          return [["J", "spade"], 10];
        } else if (card === 41) {
          return [["J", "club"], 10];
        } else if (card === 42) {
          return [["J", "heart"], 10];
        } else if (card === 43) {
          return [["J", "diamond"], 10];
        }
      }
    }
  }
  return [[""], 0];
};
