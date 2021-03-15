import React, { FunctionComponent } from "react";
import ChipsSubtract from "./Chips/ChipsSubtract";

const BettingCircle: FunctionComponent = () => {
  return (
    <div id="betting-circle">
      <div className="circular">
        <svg viewBox="0 0 100 100" /*height="50px" width="50px"*/>
          <path d="M 0,50 a 50,50 0 1,1 0,1 z" id="circle" />
          <text>
            <textPath xlinkHref="#circle">Place Bet</textPath>
          </text>
        </svg>
      </div>
      <ChipsSubtract />
    </div>
  );
};

export default BettingCircle;
