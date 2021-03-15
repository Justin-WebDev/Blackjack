import React, { FunctionComponent, useState } from "react";
import { Router } from "@reach/router";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import BlackJack from "./BlackJack";
import Home from "./Home";

const App: FunctionComponent = () => {
  const [userState, setUserState] = useState(
    {} as {
      firstName: string;
      lastName: string;
      username: string;
      email: string;
    }
  );
  return (
    <React.StrictMode>
      <Router>
        <Home path="/" />
        <SignupPage path="/signup" />
        <LoginPage path="/login" />
        <BlackJack path="/blackjack" />
      </Router>
    </React.StrictMode>
  );
};

export default App;
