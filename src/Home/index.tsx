import { RouteComponentProps, Link } from "@reach/router";
import React, { FunctionComponent } from "react";
import { getToken, isAuthenticated, logout } from "../auth/utils";
// import Profile from "../Profile";

const Home: FunctionComponent<RouteComponentProps> = () => {
  return (
    <div>
      {getToken() ? (
        isAuthenticated() ? (
          <div>
            <Link to="/blackjack">
              <div>PLAY BLACKJACK</div>
            </Link>
            {/* <Profile /> */}
            <div onClick={() => logout()}>logout</div>
          </div>
        ) : (
          <Link to="/login">
            <div>Login</div>
          </Link>
        )
      ) : (
        <Link to="/signup">
          <div>Signup</div>
        </Link>
      )}
    </div>
  );
};

export default Home;
